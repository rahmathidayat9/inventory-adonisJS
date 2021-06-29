'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BarangMasuk extends Model {
	static get table() {
		return 'barang_masuk'
	}
}

module.exports = BarangMasuk
