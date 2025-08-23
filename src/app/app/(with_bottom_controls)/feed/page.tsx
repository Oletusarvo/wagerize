import { BetList } from '@/features/bets/components/BetList';
import db from 'betting_app/dbconfig';

export default async function FeedPage({ searchParams }) {
  const { authorId, page, q } = await searchParams;
  const [{ count }] = await db('bets.bet').count('* as count');
  const numBets = typeof count === 'string' ? parseInt(count) : count;
  const betsOnPage = 10;
  const numPages = Math.ceil(numBets / betsOnPage);
  const offset = betsOnPage * ((page && parseInt(page)) || 0);
  /*
  const bets = await Bets.get({
    query: authorId && { author_id: authorId },
    select: ['bet.data', 'bet.expires_at', 'bet.id', 'bet.currency_id'],
    search: q,
    ctx: db,
  })
    .offset(offset)
    .limit(betsOnPage)
    .orderBy('created_at', 'desc');

  const bidPromises = bets.map(async bet => Bets.joinBid(bet));
  await Promise.all(bidPromises);
  */

  return (
    <div className='px-default flex flex-col gap-2 w-full h-full py-4'>
      <BetList
        betsOnPage={betsOnPage}
        numPages={numPages}
        search={q}
      />
    </div>
  );
}
