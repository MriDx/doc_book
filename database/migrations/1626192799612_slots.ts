import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Slots extends BaseSchema {
  protected tableName = 'slots'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('slot_uid')
      table.integer('associate_id').unsigned().references('id').inTable('users')
      table.timestamp('start_time').notNullable()
      table.timestamp('end_time').notNullable()
      table.boolean('available').defaultTo(false)
      table.timestamp('expires_at')
      table.timestamp('booking_start_time').notNullable()
      table.timestamp('booking_end_time').notNullable()
      table.integer('capacity').defaultTo(1)
      table.integer('current_filled').defaultTo(0)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
