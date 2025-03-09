/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('users')
    .createTable('currency', tbl => {
      tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
      tbl
        .uuid('author_id')
        .references('id')
        .inTable('users.user')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      tbl.string('symbol', 4).notNullable().unique();
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl
        .timestamp('last_used_at')
        .comment(
          'Updated with the current timestamp every time a bid is placed using the currency.'
        );
    })
    .then(async () => {
      //Add a currency representing the default dice-currency.
      await knex('users.currency').insert({
        symbol: 'DICE',
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('users').dropTableIfExists('currency');
};
