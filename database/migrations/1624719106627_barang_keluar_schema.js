'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarangKeluarSchema extends Schema {
  up () {
    this.create('barang_keluar', (table) => {
      table.increments()
      table.string('kode_transaksi')
      table.string('tanggal_masuk')
      table.string('tanggal_keluar')
      table.string('lokasi')
      table.string('kode_barang')
      table.string('nama_barang')
      table.string('satuan')
      table.integer('jumlah')
      table.timestamps()
    })
  }

  down () {
    this.drop('barang_keluar')
  }
}

module.exports = BarangKeluarSchema
