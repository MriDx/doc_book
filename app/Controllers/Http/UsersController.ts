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

	public async show_doctor({ params:{id} }: HttpContextContract) {
		return await User.query()
			.where('id', id)
			.where('role', 'doctor')
			.preload('details')
			.select(['id', 'name', 'phone', 'email'])
			.firstOrFail()

	}


	public async requests({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('requests').query().preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	public async requestsPending({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('requests').query().where('status', 'requested')
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	public async requestsAccepted({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('requests').query().where('status', 'accepted')
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	public async requestsRejected({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('requests').query().where('status', 'rejected')
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

}
