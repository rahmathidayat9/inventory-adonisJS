'use strict'

const BarangKeluar = use('App/Models/BarangKeluar')
const BarangMasuk = use('App/Models/BarangMasuk')

class BarangKeluarController {
	async index ({ request, response, view }) {
		const barang_keluar = await BarangKeluar.all()
		return view.render('admin.barang-keluar.index', { barang_keluar: barang_keluar.rows })
	}

	async create ({ request, response, params, view }) {
		const barang_masuk = await BarangMasuk.findOrFail(params.id)
		return view.render('admin.barang-keluar.create', { barang_masuk: barang_masuk })
	}

	async store ({ request, response, params, session }) {
		const barang_masuk = await BarangMasuk.findOrFail(params.id)

		await BarangKeluar.create({
			nama_barang: request.input('nama_barang'),
			kode_barang: request.input('kode_barang'),
			jumlah: request.input('jumlah'),
			satuan: request.input('satuan'),
			lokasi: request.input('lokasi'),
			tanggal_masuk: request.input('tanggal_masuk'),
			tanggal_keluar: request.input('tanggal_keluar'),
			kode_transaksi: request.input('kode_transaksi'),
		})

		if (request.input('jumlah') < barang_masuk.jumlah) {
			barang_masuk.merge({
				jumlah: barang_masuk.jumlah-request.input('jumlah'),	
			})
			
			await barang_masuk.save()
		}else{
			await barang_masuk.delete()
		}

		session.flash({ success: 'Barang berhasil dikeluarkan!' })
		return response.route('barang-keluar.index')
	}
}

module.exports = BarangKeluarController
