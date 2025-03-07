import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import { Knex } from 'knex';

export abstract class Bets {
  static get({
    query,
    search,
    select,
    ctx,
  }: {
    query: any;
    search?: string;
    select?: string[];
    ctx: Knex | Knex.Transaction;
  }) {
    const q = ctx('bets.bet as bet').leftJoin(db.raw('bets.bid as bid on bid.bet_id = bet.id'));
    //.leftJoin(db.raw('bets.outcome as outcome on outcome.bet_id = bet.id'));

    if (search) {
      q.where(function () {
        const str = `%${search}%`;
        this.whereRaw("data->>'title' ILIKE ?", [str]).orWhereRaw("data->>'description' ILIKE ?", [
          str,
        ]);
      });
    }

    if (query) {
      if (search) {
        q.andWhere(query);
      } else {
        q.where(query);
      }
    }

    q.select([
      ...(select || 'bet.*'),
      db.raw('COALESCE(sum (CAST(bid.amount as INTEGER)), 0) as pool'),
      //db.raw("json_agg(json_build_object('id', outcome.id, 'label', outcome.label)) as outcomes"),
    ]);
    return q.groupBy('bet.id');
  }

  /**Adds the bid the logged in user has placed, onto the passed bet, if one exists. */
  static async joinBid(bet: any) {
    const session = await getSession();
    const bid = await db('bets.bid as bid')
      .join(db.raw('bets.outcome as o on o.id = bid.outcome_id'))
      .where({ user_id: session.user.id, 'bid.bet_id': bet.id })
      .select('bid.id', db.raw('CAST(bid.amount as INTEGER)'), 'o.label as outcome')
      .first();
    console.log(bid);
    bet.bid = bid;
  }

  static async joinOutcomes(bet: any) {
    const outcomes = await db('bets.outcome').where({ bet_id: bet.id }).select('id', 'label');
    bet.outcomes = outcomes;
  }
}
