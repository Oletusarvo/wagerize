/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    //const trx = await knex.transaction();
    try {
      const stream = await knex('bets.bet').select('id', 'data');
      for await (const bet of stream) {
        await knex('bets.bet_metadata').insert({
          bet_id: bet.id,
          title: bet.data?.title.slice(0, 32) || 'No title',
          description: bet.data?.description,
          min_bid: bet.data?.min_bid,
          min_raise: bet.data?.min_raise,
          max_raise: bet.data?.max_raise,
        });
      }
      //await trx.commit();
      resolve();
    } catch (err) {
      //await tx.rollback();
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
