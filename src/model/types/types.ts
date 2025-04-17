export type Genre = {
	name: string
}

export type Movie = {
	id: number
	name: string
	poster?: {
		url: string
		previewUrl: string
	}
	year: number
	genres?: Genre[]
	rating?: {
		kp: number
	}
}
