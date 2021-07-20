import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Slot from 'App/Models/Slot'
import SlotAddValidator from 'App/Validators/SlotAddValidator'
import User from 'App/Models/User'
import Booking from 'App/Models/Booking'
import axios from 'axios'

export default class SlotsController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ }: HttpContextContract) {
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

  public async add({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(SlotAddValidator)
    //return data
    const user = await auth.use('api').authenticate()
    await user.related('slots').create(data)
    return response.json({ status: 'success' })
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

  public async my_slots({ auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()
    return await user.related('slots').query()
      .preload('bookings', (b) => b.preload('requested_user', (u) => u.select(['id', 'name', 'phone', 'email'])))
  }

  public async my_slots_paginated({ }: HttpContextContract) {

  }

  public async requestsBySlot({ params: { id } }: HttpContextContract) {
    return await (await Slot.findByOrFail('id', id))
      .related('bookings').query()
      .preload('requested_user', (u) => u.select(['id', 'name', 'phone', 'email']))

  }


  public async book({ auth, params: { slot_id }, response }: HttpContextContract) {
    const slot = await Slot.findByOrFail('id', slot_id)
    const user = await auth.use('api').authenticate()

    let bookingData = await Booking.query()
      .where('requested_by', user.id)
      .where('slot_id', slot_id)
      .first()


    if (bookingData != null)
      return response.json({ status: 'success', message: 'already requested' })

    if (slot.capacity <= slot.current_filled) {
      return response.status(422).json({ status: 'failed', message: 'slot already filled !' })
    }

    await user.related('requests').updateOrCreate({}, {
      slot_id: slot.id
    })

    const d = {
      title: 'Slot booking received !',
      body: ` You received a new slot booking request against slot id - ${slot.slot_uid}`
    }
    await this.sendNotification({
      to: `/topics/${slot.associate_id}`,
      notification: d,
      data: d
    })
    return response.json({ status: 'success' })


  }


  private async sendNotification(data) {
    let d = await axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAqZEIptE:APA91bFBtnl1y53_1zLBYArz8P9NC981s3D1n7qp9-X_AASL4lW18prDrE0PUxnNoZ96gj7m4qKoUgMEgFa7SdLBKF8x14jFzV4TNtFat_IihyCnEZBX6ZV-E57WXtvN7JC0wwuo4icN'
      }
    })
    console.log(d)
  }






}
