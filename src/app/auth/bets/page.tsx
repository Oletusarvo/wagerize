import { Paginator } from '@/components/feature/Paginator';
import { BetList } from '@/features/bets/components/BetList';
import { Bets } from '@/features/bets/DAL/Bets';
import db from 'betting_app/dbconfig';

export default async function BetsPage({ searchParams }) {
  const { authorId, page, q } = await searchParams;
  const [{ count }] = await db('bets.bet').count('* as count');
  const numBets = typeof count === 'string' ? parseInt(count) : count;
  const betsOnPage = 100;
  const numPages = Math.ceil(numBets / betsOnPage);
  const offset = betsOnPage * ((page && parseInt(page)) || 0);

  const bets = await Bets.get({
    query: authorId && { author_id: authorId },
    select: ['bet.data', 'bet.expires_at', 'bet.id'],
    search: q,
    ctx: db,
  })
    .offset(offset)
    .limit(betsOnPage)
    .orderBy('created_at', 'desc');

  const bidPromises = bets.map(async bet => Bets.joinBid(bet));
  await Promise.all(bidPromises);

  return (
    <main className='lg:px-default xs:px-4 flex flex-col gap-2 w-full flex-1 overflow-y-scroll py-4'>
      <h1 className='text-2xl text-gray-500'>Bets</h1>
      <BetList bets={bets} />
      <Paginator
        paramName={'page'}
        currentPage={parseInt(page)}
        numPages={numPages - 1}
      />
    </main>
  );
}
