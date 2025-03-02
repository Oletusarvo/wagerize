/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { loadSql } = require('../migration_utils/loadSql');

exports.up = function (knex) {
  return knex.schema
    .withSchema('users')
    .createTableIfNotExists('user', tbl => {
      tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
      tbl
        .integer('user_status_id')
        .references('id')
        .inTable('users.user_status')
        .onUpdate('CASCADE');
      tbl.string('email', 64).notNullable().unique();
      tbl.string('password').comment('An encrypted version of the password');
      tbl.timestamps(true, true, false);
      tbl.timestamp('last_logged_in');
    })
    .then(async () => {
      //Run the sql creating the trigger to set the default user status.
      const sql = await loadSql('setDefaultUserStatus.sql');
      await knex.schema.raw(sql);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('users')
    .raw('DROP FUNCTION IF EXISTS set_default_user_status')
    .raw('DROP TRIGGER IF EXISTS set_default_user_status')
    .dropTableIfExists('user');
};
