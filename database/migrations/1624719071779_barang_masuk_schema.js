'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarangMasukSchema extends Schema {
  up () {
    this.create('barang_masuk', (table) => {
      table.increments()
      table.string('kode_transaksi')
      table.string('tanggal')
      table.string('lokasi')
      table.string('kode_barang')
      table.string('nama_barang')
      table.string('satuan')
      table.integer('jumlah')
      table.timestamps()
    })
  }

  down () {
    this.drop('barang_masuk')
  }
}

module.exports = BarangMasukSchema
