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

	public async listDoctors({ }: HttpContextContract) {
		return await User.query()
			.where('role', 'doctor')
			.select(['id', 'name', 'email', 'phone', 'active', 'created_at'])
			.preload('details')

	}

	public async show_doctor({ params: { id } }: HttpContextContract) {
		return await User.query()
			.where('id', id)
			.where('role', 'doctor')
			.preload('details')
			.select(['id', 'name', 'phone', 'email'])
			.firstOrFail()

	}


	public async requests({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return await user.related('requests').query()
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	public async requestsPending({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return await user.related('requests').query().where('status', 'requested')
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	public async requestsAccepted({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return await user.related('requests').query().where('status', 'accepted')
			//.preload('slot')
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	public async requestsRejected({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return await user.related('requests').query().where('status', 'rejected')
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	/* //find user which role is admin
	public async findAdmin({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('details').query().where('role', 'admin')
	} */

	/* //find all bookings of a user
	public async findBookings({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('bookings').query().preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	//find all booking requests of a user
	public async findBookingRequests({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('booking_requests').query().preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	//find all requests of a user
	public async findRequests({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('requests').query().preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}


	// github copilot

	//find all user accepted requests
	public async findAcceptedRequests({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('requests').query().where('status', 'accepted')
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	//find all user rejected requests
	public async findRejectedRequests({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('requests').query().where('status', 'rejected')
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	}

	// find all user pending requests
	public async findPendingRequests({ auth }: HttpContextContract) {
		const user = await auth.use('api').authenticate()
		return user.related('requests').query().where('status', 'requested')
			.preload('slot', (b) => b.preload('associated_to', (b) => b.select(['id', 'name', 'phone', 'email'])))
	} */


}
