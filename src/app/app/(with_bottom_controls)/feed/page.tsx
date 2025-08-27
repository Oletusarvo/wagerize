import { WithSearchBar } from '@/components/feature/WithSearchBar';
import { BetList } from '@/features/bets/components/BetList';
import { getBet } from '@/features/bets/DAL/getBet';
import db from 'betting_app/dbconfig';

export default async function FeedPage({ searchParams }) {
  const { q } = await searchParams;
  const initialBets = await getBet(db).limit(10);

  return (
    <WithSearchBar>
      <BetList bets={initialBets} />
    </WithSearchBar>
  );
}
