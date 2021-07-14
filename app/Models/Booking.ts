import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Slot from 'App/Models/Slot'
import  User from 'App/Models/User'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public slot_id: number

  @column()
  public requested_by: number

  @column()
  public status: string

  @column()
  public status_reason: string

  @column()
  public action_by: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => Slot, {
    foreignKey: 'slot_id',
    localKey: 'id'
  })
  public slot: BelongsTo<typeof Slot>

  @belongsTo(() => User, {
    foreignKey: 'requested_by',
    localKey: 'id'
  })
  public requested_user: BelongsTo<typeof User>

  @hasOne(() => User, {
    foreignKey: 'id',
    localKey: 'action_by'
  })
  public action_performed_by: HasOne<typeof User>

}
