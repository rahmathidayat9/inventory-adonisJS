'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Satuan = use('App/Models/Satuan')

/**
 * Resourceful controller for interacting with satuans
 */
class SatuanController {
  /**
   * Show a list of all satuans.
   * GET satuans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const satuan = await Satuan.all()
    return view.render('admin.satuan.index', { satuan: satuan.rows })
  }

  /**
   * Render a form to be used for creating a new satuan.
   * GET satuans/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('admin.satuan.create')
  }

  /**
   * Create/save a new satuan.
   * POST satuans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    await Satuan.create(request.only(['nama_satuan', 'kode_satuan']))
    return response.route('satuan.index')
    session.flash({ success: 'Data berhasil ditambah!' })
    return response.route('satuan.index')
  }

  /**
   * Display a single satuan.
   * GET satuans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const satuan = await Satuan.findOrFail(params.id)
    return view.render('admin.satuan.show', { satuan: satuan })
  }

  /**
   * Render a form to update an existing satuan.
   * GET satuans/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const satuan = await Satuan.findOrFail(params.id)
    return view.render('admin.satuan.edit', { satuan: satuan })
  }

  /**
   * Update satuan details.
   * PUT or PATCH satuans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {
    const satuan = await Satuan.findOrFail(params.id)
    satuan.merge(request.only(['nama_satuan', 'kode_satuan']))
    await satuan.save()
    session.flash({ success: 'Data berhasil diupdate!' })
    return response.route('satuan.index')
  }

  /**
   * Delete a satuan with id.
   * DELETE satuans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {
    const satuan = await Satuan.findOrFail(params.id)
    await satuan.delete()
    session.flash({ success: 'Data berhasil dihapus!' })
    return response.route('satuan.index')
  }
}

module.exports = SatuanController
