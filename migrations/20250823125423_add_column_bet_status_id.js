/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('bets').alterTable('bet', tbl => {
    tbl
      .integer('bet_status_id')
      .notNullable()
      .defaultTo(1)
      .references('id')
      .inTable('bets.bet_status')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('bets').alterTable('bet', tbl => {
    tbl.dropColumn('bet_status_id');
  });
};
