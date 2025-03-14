const { createLookupTable } = require('../migration_utils/createLookupTable');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('notifications')
    .createTable('notification_type', createLookupTable)
    .createTable('notification', tbl => {
      tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
      tbl
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users.user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('notification_type_id')
        .notNullable()
        .references('id')
        .inTable('notifications.notification_type')
        .onUpdate('CASCADE');
      tbl.string('message', 64).notNullable();
      tbl.jsonb('content');
    })
    .then(async () => {
      await knex('notifications.notification_type').insert([{ label: 'Bet Result' }]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('notifications')
    .dropTableIfExists('notification')
    .dropTableIfExists('notification_type');
};
