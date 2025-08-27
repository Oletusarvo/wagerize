/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('bets').alterTable('bid', tbl => {
    tbl
      .integer('bid_status_id')
      .defaultTo(1)
      .references('id')
      .inTable('bets.bid_status')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('bets').alterTable('bid', tbl => {
    tbl.dropColumn('bid_status_id');
  });
};
