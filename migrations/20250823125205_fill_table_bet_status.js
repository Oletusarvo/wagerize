/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex('bets.bet_status').insert([
    { label: 'pending' },
    { label: 'active' },
    { label: 'frozen' },
    { label: 'ended' },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
