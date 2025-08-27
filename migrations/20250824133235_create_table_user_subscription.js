const { createLookupTable } = require('../migration_utils/createLookupTable.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('users').createTable('user_subscription', tbl => {
    createLookupTable(tbl);
    tbl.integer('max_bets');
    tbl.integer('max_bids');
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('users').dropTable('user_subscription');
};
