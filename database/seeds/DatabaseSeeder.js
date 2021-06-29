'use strict'

const User = use('App/Models/User')
const Satuan = use('App/Models/Satuan')

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
  	await User.create({
  		username: 'Rahmat Hidayatullah',
  		email: 'rahmat@example.com',
  		password: 'password',
      role: 'admin'
  	})

  	await User.create({
  		username: 'Elaina',
  		email: 'elaina@example.com',
  		password: 'password',
      role: 'admin'
  	})

  	await User.create({
  		username: 'Ayane',
  		email: 'ayane@example.com',
  		password: 'password',
      role: 'admin'
  	})

    await User.create({
      username: 'Alan Walker',
      email: 'user@example.com',
      password: 'password',
      role: 'user'
    })

    await Satuan.create({
      kode_satuan: 'DUS',
      nama_satuan: 'Dus',
    })

    await Satuan.create({
      kode_satuan: 'PCS',
      nama_satuan: 'Pcs',
    })

    await Satuan.create({
      kode_satuan: 'PACK',
      nama_satuan: 'Pack',
    })
  }
}

module.exports = DatabaseSeeder
