/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('bets').createTable('bet_metadata', tbl => {
    tbl
      .uuid('bet_id')
      .primary()
      .references('id')
      .inTable('bets.bet')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('title', 32).notNullable();
    tbl.string('description');
    tbl.integer('min_bid').defaultTo(1);
    tbl.integer('min_raise');
    tbl.integer('max_raise');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('bets').dropTable('bet_metadata');
};
