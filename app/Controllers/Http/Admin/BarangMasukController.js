'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BarangMasuk = use('App/Models/BarangMasuk')
const Satuan = use('App/Models/Satuan')
const { validate } = use('Validator')
const randomstring = use("randomstring")

/**
 * Resourceful controller for interacting with barangmasuk
 */
class BarangMasukController {
  /**
   * Show a list of all barangmasuk.
   * GET barangmasuk
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const barang_masuk = await BarangMasuk.all()
    return view.render('admin.barang-masuk.index', { barang_masuk: barang_masuk.rows })
  }

  /**
   * Render a form to be used for creating a new barangmasuk.
   * GET barangmasuk/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const satuan = await Satuan.all()
    
    const randomstr1 = randomstring.generate({
      length:9,
      charset: 'numeric'
    })

    const randomstr2 = randomstring.generate({
      length:9,
      charset: 'numeric'
    })
    
    return view.render('admin.barang-masuk.create', { 
       satuan: satuan.rows, 
       randomstr1: randomstr1,
       randomstr2: randomstr2,
    })
  }

  /**
   * Create/save a new barangmasuk.
   * POST barangmasuk
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    const validator = await validate(request.all(), {
      nama_barang: 'required',
      kode_barang: 'required',
      kode_transaksi: 'required',
      jumlah: 'required',
      lokasi: 'required',      
    })

    if (validator.fails()) {
      session.withErrors(validator.messages())
      return response.redirect('back')
    }

    await BarangMasuk.create({
      nama_barang: request.input('nama_barang'),
      kode_barang: request.input('kode_barang'),
      jumlah: request.input('jumlah'),
      kode_transaksi: request.input('kode_transaksi'),
      satuan: request.input('satuan'),
      lokasi: request.input('lokasi'),
      tanggal: request.input('tanggal'),
    })

    session.flash({ success: 'Data berhasil ditambah!' })
    return response.route('barang-masuk.index')
  }

  /**
   * Display a single barangmasuk.
   * GET barangmasuk/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const barang_masuk = await BarangMasuk.findOrFail(params.id)
    return view.render('admin.barang-masuk.show', { barang_masuk: barang_masuk })
  }

  /**
   * Render a form to update an existing barangmasuk.
   * GET barangmasuk/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const barang_masuk = await BarangMasuk.findOrFail(params.id)
    const satuan = await Satuan.all()
    return view.render('admin.barang-masuk.edit', { barang_masuk: barang_masuk, satuan: satuan.rows })
  }

  /**
   * Update barangmasuk details.
   * PUT or PATCH barangmasuk/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {
    const validator = await validate(request.all(), {
      nama_barang: 'required',
      jumlah: 'required',
      lokasi: 'required',      
    })

    if (validator.fails()) {
      session.withErrors(validator.messages())
      return response.redirect('back')
    }

    const barang_masuk = await BarangMasuk.findOrFail(params.id)

    barang_masuk.merge({
      nama_barang: request.input('nama_barang'),
      jumlah: request.input('jumlah'),
      satuan: request.input('satuan'),
      lokasi: request.input('lokasi'),
      tanggal: request.input('tanggal'),
    })
    await barang_masuk.save()

    session.flash({ success: 'Data berhasil diupdate!' })
    return response.route('barang-masuk.index')
  }

  /**
   * Delete a barangmasuk with id.
   * DELETE barangmasuk/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {
    const barang_masuk = await BarangMasuk.findOrFail(params.id)
    await barang_masuk.delete()
    session.flash({ success: 'Data berhasil dihapus!' })
    return response.redirect('back')
  }
}

module.exports = BarangMasukController
