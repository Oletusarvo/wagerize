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
    if (search) {
      q.where(function () {
        const str = `${search}`;
        this.where(db.raw("data->>'title' ilike ?", [str])).orWhere(
          db.raw("data->>'description' ilike ?", [str])
        );
      });
    }
    if (query) {
      if (search) {
        q.andWhere(query);
      } else {
        q.where(query);
      }
    }

    q.select([...(select || 'bet.*'), db.raw('COALESCE(sum (bid.amount), 0) as pool')]);
    return q.groupBy('bet.id');
  }

  /**Adds the bid the logged in user has placed, onto the passed bet, if one exists. */
  static async joinBid(bet: any) {
    const session = await getSession();
    const bid = await db('bets.bid as bid')
      .join(db.raw('bets.outcome as o on o.bet_id = bid.bet_id'))
      .where({ user_id: session.user.id, 'bid.bet_id': bet.id })
      .select('bid.id', 'bid.amount', 'o.label as outcome')
      .first();

    bet.bid = bid;
  }
}
