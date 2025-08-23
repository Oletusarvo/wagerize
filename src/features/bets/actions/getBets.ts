'use server';

import db from 'betting_app/dbconfig';
import { Bets } from '../DAL/Bets';

export async function getBets(currentPage: number, resultsOnPage: number, search?: string) {
  console.log(currentPage, resultsOnPage);
  const bets = await Bets.get({
    query: null,
    search,
    select: ['bet.data', 'bet.expires_at', 'bet.id', 'bet.currency_id'],
    ctx: db,
  })
    .offset(resultsOnPage * currentPage)
    .limit(resultsOnPage)
    .orderBy('created_at', 'desc');

  const bidPromises = bets.map(async bet => Bets.joinBid(bet));
  await Promise.all(bidPromises);
  console.log(bets);
  return bets;
}
