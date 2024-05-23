import type { Knex } from 'knex'

exports.up = async (knex: Knex) => {
  const createIdAndTimestamps = (table: Knex.CreateTableBuilder): void => {
    table.increments('id').primary()
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('deleted_at')
  }
  await knex.schema
  // --- clubs ------------------
  .createTable('clubs', table => {
    createIdAndTimestamps(table)
    table.string('name', 50).notNullable()
    table.integer('user_id').notNullable().unsigned()
    table.foreign('user_id').references('users.id')
  })

  await knex.schema
  // --- clubs-users ------------------
  .createTable('clubs_users', table => {
    createIdAndTimestamps(table)
    table.integer('club_id').notNullable().unsigned()
    table.foreign('club_id').references('clubs.id')
    .onDelete('restrict')
    .onUpdate('restrict')
  table.integer('user_id').notNullable().unsigned()
    table.foreign('user_id').references('users.id')
    .onDelete('restrict')
    .onUpdate('restrict')
  })
}

exports.down = (knex: Knex) =>
knex.schema
  .dropTable('clubs_users')
  .dropTable('clubs')
