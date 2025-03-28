/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('users').alterTable('user', tbl => {
    tbl.timestamp('terms_accepted_on').defaultTo(knex.fn.now());
    tbl.timestamp('privacy_accepted_on').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('users').alterTable('user', tbl => {
    tbl.dropColumn('terms_accepted_on');
    tbl.dropColumn('privacy_accepted_on');
  });
};
