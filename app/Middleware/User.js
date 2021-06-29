'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class User {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
  	if (auth.user.role == 'user') {
  		// call next to advance the request
    	await next()
  	}else{
  		return response.route('dashboard.index')
  	}
  }
}

module.exports = User
