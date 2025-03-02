/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('bets').createTableIfNotExists('outcome', tbl => {
    tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    tbl
      .uuid('bet_id')
      .notNullable()
      .references('id')
      .inTable('bets.bet')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.string('label', 32).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('bets').dropTableIfExists('outcome');
};
