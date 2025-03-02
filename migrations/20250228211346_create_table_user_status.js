/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { createLookupTable } = require('../migration_utils/createLookupTable');

exports.up = function (knex) {
  return knex.schema
    .withSchema('users')
    .createTableIfNotExists('user_status', createLookupTable)
    .then(async () => {
      await knex('users.user_status').insert([
        { label: 'Pending' },
        { label: 'Active' },
        { label: 'Deleted' },
      ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('users').dropTableIfExists('user_status');
};
