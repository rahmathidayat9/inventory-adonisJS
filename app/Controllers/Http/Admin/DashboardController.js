'use strict'

const Database = use('Database')

class DashboardController {
	async index ({ request, response, view }) {
		const users = await Database.from('users').count()
		return view.render('admin.dashboard', { total_user: users[0]['count(*)'] })
	}
}

module.exports = DashboardController
