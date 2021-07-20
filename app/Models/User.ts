import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Slot from './Slot'
import UserDetail from './UserDetail';
import Booking from './Booking';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public active: boolean

  @column()
  public role: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }


  @hasMany(() => Slot, {
    foreignKey: 'associate_id'
  })
  public slots: HasMany<typeof Slot>


  @hasOne(() => UserDetail, {
    foreignKey: 'user_id',
    localKey: 'id'
  })
  public details: HasOne<typeof UserDetail>

  @hasMany(() => Booking, {
    foreignKey: 'requested_by',
    localKey: 'id'
  })
  public requests: HasMany<typeof Booking>


  public async toPublic() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      role: this.role,
      details: this.details
    }
  }

}
