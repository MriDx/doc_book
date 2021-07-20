import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Booking from 'App/Models/Booking'
import BookingActionAdminValidator from 'App/Validators/BookingActionAdminValidator'
import BookingCancelUserValidator from 'App/Validators/BookingCancelUserValidator'
import SlotActionValidator from 'App/Validators/SlotActionValidator'
import axios from 'axios'

export default class BookingsController {
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


  public async requests({ }: HttpContextContract) {
    return await Booking.query()
      .preload('requested_user', (b) => b.select(['id', 'name', 'phone', 'email']))
      .preload('slot', (b) => b.preload('associated_to', (c) => c.select(['id', 'name', 'phone', 'email'])))

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


  public async actionAccept({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(SlotActionValidator)
    const trx = await Database.transaction()
    const user = await auth.use('api').authenticate()

    let message = ''
    let status = 200

    try {
      const bookingData = await Booking.findByOrFail('id', data.request_id, trx)
      const bookingSlot = await bookingData.related('slot').query().firstOrFail()

      if (bookingSlot.associate_id != user.id) {
        status = 401
        throw new Exception('')
      }
      if (bookingSlot.capacity <= bookingSlot.current_filled) {
        status = 422
        message = 'slot capacity filled'
      }
      //todo add another check to validate start time
      bookingData.status = 'accepted'
      bookingData.action_by = user.id
      bookingData.status_reason = data.reason ?? bookingData.status_reason
      bookingData.useTransaction(trx)
      await bookingData.save()



      //increse slot filled count

      bookingSlot.current_filled = bookingSlot.current_filled + 1
      bookingSlot.useTransaction(trx)
      await bookingSlot.save()

      await trx.commit()

      const d = {
        title: 'Slot booking update !',
        body: ` Your slot booking request id ${bookingData.id} is ${bookingData.status}`
      }
      await this.sendNotification({
        to: `/topics/${bookingData.requested_by}`,
        notification: d,
        data: d
      })

      return response.json({ status: 'success' })
    } catch (error) {
      await trx.rollback()

    }
    return response.status(status).json({ status: 'failed', message: message })

  }

  public async actionReject({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(SlotActionValidator)
    const user = await auth.use('api').authenticate()
    const bookingData = await Booking.findByOrFail('id', data.request_id)
    const bookingSlot = await bookingData.related('slot').query().firstOrFail()

    if (bookingSlot.associate_id != user.id) {
      return response.status(401).json({ status: 'failed' })
    }
    /* if (bookingSlot.capacity <= bookingSlot.current_filled) {
      return response.status(422).json({ status: 'failed', message: 'slot capacity filled' })
    } */
    //todo add reject reason
    bookingData.status = 'rejected'
    bookingData.action_by = user.id
    bookingData.status_reason = data.reason ?? bookingData.status_reason
    await bookingData.save()

    const d = {
      title: 'Slot booking update !',
      body: ` Your slot booking request id ${bookingData.id} is ${bookingData.status}`
    }
    await this.sendNotification({
      to: `/topics/${bookingData.requested_by}`,
      notification: d,
      data: d
    })

    return response.json({ status: 'success' })
  }

  public async admin_action({ request, auth, params: { request_id }, response }: HttpContextContract) {
    const data = await request.validate(BookingActionAdminValidator)
    const bookingData = await Booking.findByOrFail('id', request_id)
    const user = await auth.use('api').authenticate()
    const bookingSlot = await bookingData.related('slot').query().firstOrFail()
    if (bookingSlot.capacity <= bookingSlot.current_filled) {
      return response.status(422).json({ status: 'failed', message: 'slot capacity filled' })
    }
    bookingData.status = data.status
    bookingData.status_reason = data.reason ?? bookingData.status_reason
    bookingData.action_by = user.id
    await bookingData.save()
    const d = {
      title: 'Slot booking update !',
      body: ` Your slot booking request id ${bookingData.id} is ${bookingData.status}`
    }
    await this.sendNotification({
      to: `/topics/${bookingData.requested_by}`,
      notification: d,
      data: d
    })
    return response.json({ status: 'success' })
  }


  public async user_cancel({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(BookingCancelUserValidator)
    const user = await auth.use('api').authenticate()
    const bookingData = await user.related('requests').query()
      .where('id', data.request_id)
      .firstOrFail()

    if (bookingData.status == 'rejected') {
      return response.json({ status: 'cancelled already !' })
    }

    bookingData.status = 'rejected'
    bookingData.status_reason = data.reason ?? bookingData.status_reason
    bookingData.action_by = user.id

    await bookingData.save()

    const d = {
      title: 'Slot booking update !',
      body: ` Your slot booking request id ${bookingData.id} is ${bookingData.status}.`
    }
    await this.sendNotification({
      to: `/topics/${bookingData.requested_by}`,
      notification: d,
      data: d
    })

    return response.json({ status: 'success' })

  }



}
