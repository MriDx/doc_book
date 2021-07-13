import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Slot from 'App/Models/Slot'
import SlotAddValidator from 'App/Validators/SlotAddValidator'

export default class SlotsController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }

  public async add({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(SlotAddValidator)
    const user = await auth.use('api').authenticate()
    await user.related('slots').create(data)
    return response.json({status: 'success'})
  }

  public async all({ request, response }: HttpContextContract) {
    return await Slot.query()
      .where('available', true)
      .where('start_time', '>', new Date())
      .orderBy('start_time', 'asc')

  }

}
