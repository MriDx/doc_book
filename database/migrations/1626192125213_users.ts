import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'
  schema: any

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable()
      table.string('email', 50).nullable().unique()
      table.string('phone', 20).nullable().unique()
      table.string('password').notNullable()
      table.boolean('active').defaultTo(true)
      table.enum('role', ['admin', 'doctor', 'user', 'developer']).defaultTo('user')
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }



}
