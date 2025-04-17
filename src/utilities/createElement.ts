export class CreateElement {
	public tag: string

	public innerHTML?: string

	public attributes?: {
		className?: string
		id?: string
	}

	constructor(
		tag: string,
		attributes?: { className?: string; id?: string },
		innerHTML?: string
	) {
		this.tag = tag
		this.attributes = attributes
		this.innerHTML = innerHTML
	}

	createElement(): HTMLElement {
		const element = document.createElement(this.tag)
		if (this.attributes?.className) {
			element.className = this.attributes.className
		}
		if (this.attributes?.id) {
			element.id = this.attributes.id
		}
		if (this.innerHTML) {
			element.innerHTML = this.innerHTML
		}

		return element
	}
}

export default CreateElement
