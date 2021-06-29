'use strict'

const BarangMasuk = use('App/Models/BarangMasuk')
const BarangKeluar = use('App/Models/BarangKeluar')

class BarangController {
	async barangMasuk ({ request, response, view }) {
		const barang_masuk = await BarangMasuk.all()
		return view.render('user.barang-masuk', { barang_masuk: barang_masuk.rows })
	}

	async barangKeluar ({ request, response, view }) {
		const barang_keluar = await BarangKeluar.all()
		return view.render('user.barang-keluar', { barang_keluar: barang_keluar.rows })
	}
}

module.exports = BarangController
