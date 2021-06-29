'use strict'

class LoginController {
	async authenticated ({ request, response, auth }) {
		const { email, password } = request.all()
		await auth.attempt(email, password)
		return response.route('dashboard.index')
	}
}

module.exports = LoginController
