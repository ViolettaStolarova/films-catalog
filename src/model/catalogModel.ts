import MovieApi from '../api/movieApi/movieApi.singleton'
import { Genre, Movie } from './types/types'

export class CatalogModel {
	private movies: Movie[] = []
	private genres: Genre[] = []
	private currentGenre: string = 'all'
	private currentPage: number = 0

	public async fetchInitialData(): Promise<void> {
		this.genres = await MovieApi.getGenres()
	}

	public async fetchMovies(page: number = 1): Promise<Movie[]> {
		const newMovies =
			this.currentGenre === 'all'
				? await MovieApi.getMovies(page)
				: await MovieApi.getMoviesByGenre(this.currentGenre, page)

		if (page === 1) {
			this.movies = newMovies
		} else {
			this.movies = [...this.movies, ...newMovies]
		}

		this.currentPage = page
		return newMovies
	}

	public getGenres(): Genre[] {
		return this.genres
	}

	public setCurrentGenre(genre: string): void {
		this.currentGenre = genre
	}

	public getCurrentGenre(): string {
		return this.currentGenre
	}

	public getCurrentPage(): number {
		return this.currentPage
	}

	public getCurrentMovies(): Movie[] {
		return this.movies
	}
}
