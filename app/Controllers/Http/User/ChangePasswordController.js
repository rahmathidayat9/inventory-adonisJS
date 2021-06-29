'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class ChangePasswordController {
	async index ({ request, response, view }) {
		return view.render('user.change-password')
	}

	async update ({ request, response, session, auth }) {
		const validator = await validate(request.all(), {
			password: 'required|min:5|confirmed'
		})

		if (validator.fails()) {
			session.withErrors(validator.messages())
			return response.redirect('back')
		}

		const user = await User.findOrFail(auth.user.id)
		user.merge({ password: request.input('password') })
		user.save()
		
		session.flash({ success: 'Password berhasil diupdate!' })
		return response.redirect('back')
	}
}

module.exports = ChangePasswordController
