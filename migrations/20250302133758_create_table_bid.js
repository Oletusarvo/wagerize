/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('bets').createTableIfNotExists('bid', tbl => {
    tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    tbl
      .uuid('outcome_id')
      .notNullable()
      .references('id')
      .inTable('bets.outcome')
      .onUpdate('CASCADE');
    tbl
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users.user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .uuid('bet_id')
      .notNullable()
      .references('id')
      .inTable('bets.bet')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.bigint('amount').notNullable();
    tbl.timestamp('placed_on').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('bets').dropTableIfExists('position');
};
