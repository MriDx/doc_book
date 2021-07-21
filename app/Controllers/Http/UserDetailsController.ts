import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserDetailValidator from 'App/Validators/UserDetailValidator';

export default class UserDetailsController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ request, auth, response }: HttpContextContract) {

    const data = await request.validate(UserDetailValidator)
    const user = await auth.use('api').authenticate()
    await user.related('details').updateOrCreate({}, {
      'details': JSON.stringify(data.details)
    })

    return response.json({ status: 'success' })

  }

  public async store({ }: HttpContextContract) {
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
