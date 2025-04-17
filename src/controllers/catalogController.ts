import { CatalogModel } from '../model/catalogModel'
import { CatalogView } from '../view/catalogView'

export class CatalogController {
	private model: CatalogModel
	private view: CatalogView
	private isLoading: boolean = false

	constructor(model: CatalogModel, view: CatalogView) {
		this.model = model
		this.view = view

		this.init()
	}

	private async init(): Promise<void> {
		try {
			await this.model.fetchInitialData()

			this.view.initGenreDropdown(this.model.getGenres())

			await this.loadMovies()

			this.setupEventListeners()
		} catch (error) {
			this.view.showError(
				'Не удалось загрузить данные. Пожалуйста, попробуйте позже.'
			)
		}
	}

	private async loadMovies(page: number = 1): Promise<void> {
		if (this.isLoading) return

		this.isLoading = true

		page === 1 ? this.view.showLoader() : this.view.setLoadMoreButtonState(true)

		try {
			const newMovies = await this.model.fetchMovies(page)

			page === 1
				? this.view.displayMovies(newMovies)
				: this.view.appendMovies(newMovies)

			this.view.toggleLoadMoreButton(newMovies.length > 0)
		} catch (error) {
			this.view.showError(
				'Ошибка загрузки. Проверьте интернет соединение и попробуйте еще раз'
			)
		} finally {
			this.isLoading = false

			page === 1
				? this.view.hideLoader()
				: this.view.setLoadMoreButtonState(false)
		}
	}

	private async handleGenreChange(genre: string): Promise<void> {
		this.model.setCurrentGenre(genre)

		await this.loadMovies(1)
	}

	private async handleLoadMore(): Promise<void> {
		await this.loadMovies(this.model.getCurrentPage() + 1)
	}

	private setupEventListeners(): void {
		this.view.bindGenreSelectChange(genre => this.handleGenreChange(genre))

		this.view.bindLoadMoreClick(() => this.handleLoadMore())
	}

	public async refresh(): Promise<void> {
		await this.loadMovies(1)
	}
}
