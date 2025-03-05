/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { loadSql } = require('../migration_utils/loadSql');
exports.up = function (knex) {
  return knex.schema
    .withSchema('users')
    .createTable('wallet', tbl => {
      tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
      tbl
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users.user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.bigint('balance').defaultTo(10000);
    })
    .then(async () => {
      const sql = await loadSql('createDefaultWallet.sql');
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
    .raw('DROP TRIGGER IF EXISTS create_default_wallet')
    .raw('DROP FUNCTION IF EXISTS create_default_wallet')
    .dropTableIfExists('wallet');
};
