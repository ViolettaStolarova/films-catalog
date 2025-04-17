import { Genre, Movie } from '../model/types/types'
import {
	getGenreSelect,
	getMoviesContainer,
	getMoviesContainerErrorMessage,
	getMoviesContainerLoader,
	getLoadMoreButton,
} from '../utilities/domUtils'

export class CatalogView {
	private moviesContainer: HTMLElement
	private genreSelect: HTMLSelectElement
	private loader: HTMLElement
	private errorMessage: HTMLElement
	private loadMoreButton: HTMLButtonElement

	constructor() {
		this.moviesContainer = getMoviesContainer()
		this.genreSelect = getGenreSelect()
		this.loader = getMoviesContainerLoader()
		this.errorMessage = getMoviesContainerErrorMessage()
		this.loadMoreButton = getLoadMoreButton()
	}

	public initGenreDropdown(genres: Genre[]): void {
		this.genreSelect.innerHTML = '<option value="all">Все жанры</option>'
		genres.forEach(genre => {
			const option = document.createElement('option')
			option.value = genre.name
			option.textContent =
				genre.name.charAt(0).toUpperCase() + genre.name.slice(1)
			this.genreSelect.appendChild(option)
		})
	}

	public displayMovies(movies: Movie[]): void {
		this.moviesContainer.innerHTML = ''
		this.appendMovies(movies)
	}

	public appendMovies(movies: Movie[]): void {
		if (movies.length === 0 && this.moviesContainer.children.length === 0) {
			this.moviesContainer.innerHTML =
				'<p class="no-results">Фильмы не найдены</p>'
			return
		}

		movies.forEach(movie => {
			const movieCard = this.createMovieCard(movie)
			this.moviesContainer.appendChild(movieCard)
		})
	}

	private createMovieCard(movie: Movie): HTMLElement {
		const movieCard = document.createElement('div')
		movieCard.className = 'movie-card'

		const posterUrl =
			movie.poster?.url ||
			movie.poster?.previewUrl ||
			'https://via.placeholder.com/300x450?text=No+Poster'

		const genres = movie.genres?.map(g => g.name).join(', ') || 'Жанр не указан'

		movieCard.innerHTML = `
            <img class="movie-poster" src="${posterUrl}" alt="${
			movie.name
		}" loading="lazy">
            <div class="movie-info">
                <h3 class="movie-title">${movie.name}</h3>
                <div class="movie-year">${movie.year}</div>
                <div class="movie-rating">Рейтинг: ${
									movie.rating?.kp?.toFixed(1) || 'Н/Д'
								}</div>
                <div class="movie-genres">${genres}</div>
            </div>
        `
		return movieCard
	}

	public toggleLoadMoreButton(show: boolean): void {
		this.loadMoreButton.style.display = show ? 'block' : 'none'
	}

	public setLoadMoreButtonState(isLoading: boolean): void {
		this.loadMoreButton.disabled = isLoading
		this.loadMoreButton.textContent = isLoading ? 'Загрузка...' : 'Показать еще'
	}

	public showLoader(): void {
		this.loader.style.display = 'block'
		this.errorMessage.style.display = 'none'
	}

	public hideLoader(): void {
		this.loader.style.display = 'none'
	}

	public showError(message: string): void {
		this.errorMessage.textContent = message
		this.errorMessage.style.display = 'block'
		this.loader.style.display = 'none'
	}

	public bindGenreSelectChange(handler: (genre: string) => void): void {
		this.genreSelect.addEventListener('change', () =>
			handler(this.genreSelect.value)
		)
	}

	public bindLoadMoreClick(handler: () => void): void {
		this.loadMoreButton.addEventListener('click', handler)
	}
}
