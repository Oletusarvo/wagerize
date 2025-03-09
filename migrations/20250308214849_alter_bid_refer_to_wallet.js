/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('bets')
    .alterTable('bid', tbl => {
      tbl.uuid('wallet_id').references('id').inTable('users.wallet').onUpdate('CASCADE');
    })
    .then(async () => {
      //Populate the empty wallet ids with the currency id of DICE.
      await knex.raw(
        "UPDATE bets.bid SET wallet_id = (SELECT id FROM users.wallet WHERE user_id = bid.user_id AND currency_id = (SELECT id FROM users.currency WHERE symbol = 'DICE' LIMIT 1) LIMIT 1)"
      );
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('bets').alterTable('bid', tbl => tbl.dropColumn('wallet_id'));
};
