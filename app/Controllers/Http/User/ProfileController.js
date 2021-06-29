'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class ProfileController {
	async index ({ request, response, view }) {
		return view.render('user.profile')
	}

	async update ({ request, response, auth, session }) {
		const validator = await validate(request.all(), {
			username: 'required'
		})

		if (validator.fails()) {
			session.withErrors(validator.messages())
			return response.redirect('back')
		}

		const user = await User.findOrFail(auth.user.id)
		user.merge({ username: request.input('username') })
		await user.save()

		session.flash({ success: 'Profil berhasil diupdate!' })
		return response.redirect('back')
	}
}

module.exports = ProfileController
