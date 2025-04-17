export function getMoviesContainer(): HTMLElement {
	return document.querySelector('.movies-container') as HTMLElement
}

export function getGenreSelect(): HTMLSelectElement {
	return document.querySelector('.genre-filter') as HTMLSelectElement
}

export function getMoviesContainerLoader(): HTMLElement {
	return document.querySelector('.loader') as HTMLElement
}

export function getMoviesContainerErrorMessage(): HTMLElement {
	return document.querySelector('.error-message') as HTMLElement
}

export function getLoadMoreButton(): HTMLButtonElement {
	return document.querySelector('.loadMore-button') as HTMLButtonElement
}
