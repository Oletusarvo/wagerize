import { WithSearchBar } from '@/components/feature/with-search-bar';
import { BetList } from '@/features/bets/components/bet-list';
import { getBet } from '@/features/bets/DAL/get-bet';
import { tablenames } from '@/tablenames';
import db from 'betting_app/dbconfig';

export default async function FeedPage({ searchParams }) {
  const { q } = await searchParams;
  const initialBets = await getBet(db, q)
    .whereIn(
      'bet_status_id',
      db.select('id').from(tablenames.bet_status).whereIn('label', ['active', 'frozen'])
    )
    .orderBy('created_at', 'desc')
    .limit(10);

  return (
    <WithSearchBar>
      <BetList bets={initialBets} />
    </WithSearchBar>
  );
}
