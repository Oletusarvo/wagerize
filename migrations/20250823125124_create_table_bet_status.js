const { createLookupTable } = require('../migration_utils/createLookupTable.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('bets').createTable('bet_status', createLookupTable);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('bets').dropTable('bet_status');
};
