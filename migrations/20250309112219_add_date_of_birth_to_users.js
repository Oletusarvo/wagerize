/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('users').table('user', function (table) {
    table.timestamp('date_of_birth');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('users').table('user', function (table) {
    table.dropColumn('date_of_birth');
  });
};
