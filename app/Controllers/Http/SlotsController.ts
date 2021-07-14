import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Slot from 'App/Models/Slot'
import SlotAddValidator from 'App/Validators/SlotAddValidator'
import User from 'App/Models/User'

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

  public async all({ }: HttpContextContract) {
    return await Slot.query()
      .where('available', true)
      .where('start_time', '>', new Date())
      .orderBy('start_time', 'asc')

  }

  public async slot_by_doc({ params: { id } }: HttpContextContract) {
    return await (await User.findByOrFail('id', id)).related('slots').query()
      .where('available', true)
      .where('start_time', '>', new Date())
      .orderBy('start_time', 'asc')
  }

  public async my_slots({auth}: HttpContextContract) {
    const user = await auth.use('api').authenticate()
    return user.related('slots').query().preload('bookings')
  }

  public async my_slots_paginated({ }: HttpContextContract) {

  }

  public async book({  auth, params: {slot_id}, response }: HttpContextContract) {
    const slot = await Slot.findByOrFail('id', slot_id)
    const user = await auth.use('api').authenticate()



    if (slot.capacity <= slot.current_filled) {
      return response.status(422).json({ status: 'failed', message: 'slot already filled !' })
    }


   await user.related('requests').create({
      slot_id: slot.id
   })

    return response.json({ status: 'success'})

  }






}
