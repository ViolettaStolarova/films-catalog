import { Genre, Movie } from '../../model/types/types'

export interface IMovieApi {
	getGenres(): Promise<Genre[]>
	getMovies(page: number): Promise<Movie[]>
	getMoviesByGenre(genre: string, page: number): Promise<Movie[]>
}
