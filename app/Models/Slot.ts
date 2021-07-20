import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Booking from './Booking';
import short from 'short-uuid';

export default class Slot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public slot_uid: string

  @column()
  public associate_id: number

  @column.dateTime()
  public start_time: DateTime

  @column.dateTime()
  public end_time: DateTime

  @column()
  public available: boolean

  @column.dateTime()
  public expires_at: DateTime

  @column.dateTime()
  public booking_start_time: DateTime


  @column.dateTime()
  public booking_end_time: DateTime

  @column()
  public capacity: number

  @column()
  public current_filled: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeSave()
  public static async generateSlug(slot: Slot) {
    if (slot.$dirty.associate_id) {
      slot.slot_uid = await short.generate()
    }
  }

  @belongsTo(() => User, {
    foreignKey: 'associate_id',
    localKey: 'id'
  })
  public associated_to: BelongsTo<typeof User>


  @hasMany(() => Booking, {
    foreignKey: 'slot_id',
    localKey: 'id'
  })
  public bookings: HasMany<typeof Booking>



}
