'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Satuan extends Model {
	static get table() {
		return 'satuan'
	}
}

module.exports = Satuan
