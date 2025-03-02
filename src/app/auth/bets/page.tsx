import { BetList } from '@/features/bets/components/BetList';
import db from 'betting_app/dbconfig';

export default async function Bets() {
  const bets = await db('bets.bet').select('id', 'data', 'expires_at');
  console.log(bets);
  return (
    <main className='lg:px-default xs:px-4 flex flex-col gap-2 w-full flex-1 overflow-y-scroll py-4'>
      <h1 className='text-2xl text-gray-500'>Bets</h1>
      <BetList bets={bets} />
    </main>
  );
}
