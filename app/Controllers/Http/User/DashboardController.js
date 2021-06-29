'use strict'

class DashboardController {
	async index ({ request, view }) {
		return view.render('user.dashboard')
	}
}

module.exports = DashboardController
