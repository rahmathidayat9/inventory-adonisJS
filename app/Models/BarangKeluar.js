'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BarangKeluar extends Model {
	static get table() {
		return 'barang_keluar'
	}
}

module.exports = BarangKeluar
