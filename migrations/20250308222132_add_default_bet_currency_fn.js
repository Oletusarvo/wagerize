const { loadSql } = require('../migration_utils/loadSql');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = await loadSql('setDefaultBetCurrency.sql');
      await knex.schema.withSchema('bets').raw(sql);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('bets')
    .raw('DROP TRIGGER IF EXISTS set_default_bet_currency')
    .raw('DROP FUNCTION IF EXISTS set_default_bet_currency');
};
