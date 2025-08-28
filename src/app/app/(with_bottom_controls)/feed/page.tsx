import { WithSearchBar } from '@/components/feature/WithSearchBar';
import { BetList } from '@/features/bets/components/BetList';
import { getBet } from '@/features/bets/DAL/getBet';
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
