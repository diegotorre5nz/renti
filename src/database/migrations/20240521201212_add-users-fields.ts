import type { Knex } from 'knex'

exports.up = async (knex: Knex) => {
  await knex.schema
  // --- users ------------------
  .alterTable('users', table => {
    table.date('date_of_birth').notNullable().after('password')
    table.text('reading_preferences').notNullable().after('age')
  })
}

exports.down = (knex: Knex) =>
knex.schema
  // --- users ------------------
  .alterTable('users', table => {
    table.dropColumn('age');
    table.dropColumn('reading_preferences');
  })


