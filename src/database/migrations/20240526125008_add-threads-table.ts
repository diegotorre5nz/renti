import type { Knex } from 'knex'

exports.up = async (knex: Knex) => {
  const createIdAndTimestamps = (table: Knex.CreateTableBuilder): void => {
    table.increments('id').primary()
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('deleted_at')
  }

  await knex.schema
  // --- threads ------------------
  .createTable('threads', table => {
    createIdAndTimestamps(table)
    table.text('text').notNullable()
    table.integer('club_id').notNullable().unsigned()
      table.foreign('club_id').references('clubs.id')
      .onDelete('restrict')
      .onUpdate('restrict')
    table.integer('user_id').notNullable().unsigned()
      table.foreign('user_id').references('users.id')
      .onDelete('restrict')
      .onUpdate('restrict')
    table.integer('main_thread_id')
    table.foreign('main_thread_id').references('threads.id')
    .onDelete('restrict')
    .onUpdate('restrict')
    table.integer('previous_thread_id').unsigned()
    table.foreign('previous_thread_id').references('threads.id')
    .onDelete('restrict')
    .onUpdate('restrict')
  })
}

exports.down = (knex: Knex) =>
knex.schema
  .dropTable('threads')
