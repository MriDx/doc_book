import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('slot_id').unsigned().references('id').inTable('slots')
      table.integer('requested_by').unsigned().references('id').inTable('users')
      table.enum('status', ['requested', 'accepted', 'rejected']).defaultTo('requested')
      table.string('status_reason').nullable()
      table.integer('action_by').unsigned().references('id').inTable('users')

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
