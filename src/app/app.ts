import { CatalogController } from '../controllers/catalogController'
import { CatalogModel } from '../model/catalogModel'
import { CatalogView } from '../view/catalogView'

export class MovieApp {
	constructor() {
		new CatalogController(new CatalogModel(), new CatalogView())
	}
}
