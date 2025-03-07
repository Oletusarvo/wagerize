/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('bets')
    .alterTable('bid', tbl => {
      tbl.dropForeign('user_id');
    })
    .alterTable('bid', tbl => {
      tbl.uuid('user_id').nullable().alter();
      tbl
        .foreign('user_id')
        .references('id')
        .inTable('users.user')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('bets')
    .alterTable('bid', tbl => {
      tbl.dropForeign('user_id');
    })
    .alterTable('bid', tbl => {
      tbl.uuid('user_id').notNullable().alter();
      tbl
        .foreign('user_id')
        .references('id')
        .inTable('users.user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};
