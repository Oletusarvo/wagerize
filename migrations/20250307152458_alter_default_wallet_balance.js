/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('users').alterTable('wallet', tbl => {
    tbl.bigint('balance').defaultTo(0).alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('users').alterTable('wallet', tbl => {
    tbl.bigint('balance').defaultTo(10000).alter();
  });
};
