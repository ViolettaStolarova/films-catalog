import { Genre, Movie } from '../../model/types/types'
import { IMovieApi } from './movieApi.interface'

export class MovieApi implements IMovieApi {
	private baseUrl: string = import.meta.env.VITE_BASE_URL
	private apiKey: string = import.meta.env.VITE_API_KEY
	private readonly moviesPerPage: number = 15

	public async getGenres(): Promise<Genre[]> {
		const response = await fetch(
			`${this.baseUrl}/v1/movie/possible-values-by-field?field=genres.name`,
			{
				headers: { 'X-API-KEY': this.apiKey },
			}
		)
		return await response.json()
	}

	public async getMovies(page: number): Promise<Movie[]> {
		const response = await fetch(
			`${this.baseUrl}/v1.3/movie?page=${page}&limit=${this.moviesPerPage}`,
			{
				headers: {
					'X-API-KEY': this.apiKey,
				},
			}
		)

		const data = await response.json()
		return data.docs
	}

	public async getMoviesByGenre(
		genre: string,
		page: number = 1
	): Promise<Movie[]> {
		const response = await fetch(
			`${this.baseUrl}/v1.3/movie?page=${page}&limit=${this.moviesPerPage}&genres.name=${genre}`,
			{ headers: { 'X-API-KEY': this.apiKey } }
		)
		const data = await response.json()
		return data.docs
	}
}
