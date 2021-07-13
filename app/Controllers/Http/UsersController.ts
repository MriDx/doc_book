 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator';
import RegisterValidator from '../../Validators/RegisterValidator';

export default class UsersController {



	public async register({ request, response }: HttpContextContract) {

		//validate request

		const data = await request.validate(RegisterValidator)
		await User.create(data)
		return response.status(200).json({ status: 'success' })

	}

	public async login({ request, auth }: HttpContextContract) {
		const data = await request.validate(LoginValidator)
		const token = await auth.use('api').attempt(data.id, data.password)
		return token.toJSON()
	}


	public async show({ auth, response }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		let details = await user.related('details').query().first()
		let tmpUser = await user.toPublic()
		return response.status(200).json({
			data: {
				user: tmpUser,
				details: details
			}
		})
	}

}
