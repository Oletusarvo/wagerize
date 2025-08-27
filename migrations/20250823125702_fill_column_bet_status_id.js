/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const bets = await knex('bets.bet').select('id', 'data', 'expires_at');
      for (const bet of bets) {
        await knex('bets.bet')
          .where({ id: bet.id })
          .update({
            bet_status_id: knex
              .select('id')
              .from('bets.bet_status')
              .where({
                label:
                  Date.now() >= new Date(bet.expires_at).getTime()
                    ? 'ended'
                    : bet.data?.status == 1
                    ? 'frozen'
                    : 'active',
              })
              .limit(1),
          });
      }

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
