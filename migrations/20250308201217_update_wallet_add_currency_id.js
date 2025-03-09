/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('users')
    .alterTable('wallet', tbl => {
      tbl
        .uuid('currency_id')
        .references('id')
        .inTable('users.currency')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .then(async () => {
      //Refer to the default currency in each wallet.
      await knex.raw(
        "UPDATE users.wallet SET currency_id = (SELECT id FROM users.currency WHERE symbol = 'DICE' LIMIT 1)"
      );
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('users').dropTableIfExists('currency');
};
