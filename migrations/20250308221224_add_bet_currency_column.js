/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('bets')
    .alterTable('bet', tbl => {
      tbl.uuid('currency_id').references('id').inTable('users.currency').onUpdate('CASCADE');
    })
    .then(async () => {
      await knex.raw(
        "UPDATE bets.bet SET currency_id = (SELECT id FROM users.currency WHERE symbol = 'DICE' LIMIT 1)"
      );
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('bets').alterTable('bet', tbl => tbl.dropColumn('currency_id'));
};
