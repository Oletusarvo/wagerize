/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('bets').createTableIfNotExists('bet', tbl => {
    tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    tbl.uuid('author_id').references('id').inTable('users.user').onUpdate('CASCADE');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl
      .timestamp('expires_at')
      .comment('The timestamp at which the bet expires. Set to null for no expiry.');
    tbl.jsonb('data').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('bets').dropTableIfExists('bet');
};
