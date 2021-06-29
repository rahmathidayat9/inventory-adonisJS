'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SatuanSchema extends Schema {
  up () {
    this.create('satuan', (table) => {
      table.increments()
      table.string('kode_satuan')
      table.string('nama_satuan')
      table.timestamps()
    })
  }

  down () {
    this.drop('satuan')
  }
}

module.exports = SatuanSchema
