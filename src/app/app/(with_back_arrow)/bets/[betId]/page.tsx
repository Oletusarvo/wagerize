import { Button } from '@/components/feature/Button';
import { BetFooter } from '@/features/bets/components/BetFooter';
import { BetHeader } from '@/features/bets/components/BetHeader';
import { PlaceBidButton } from '@/features/bids/components/PlaceBidButton';
import { PoolDisplay } from '@/features/bets/components/PoolDisplay';
import { getBet } from '@/features/bets/DAL/getBet';
import { BetProvider } from '@/features/bets/providers/BetProvider';
import { BidDisplay } from '@/features/bids/components/BidDisplay';
import { getBid } from '@/features/bids/dal/getBid';
import { BidProvider } from '@/features/bids/providers/BidProvider';
import { tablenames } from '@/tablenames';
import { loadSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import Link from 'next/link';
import { ReactNode } from 'react';
import { PlaceBidModalProvider } from '@/features/bids/providers/PlaceBidModalProvider';

export default async function BetPage({ params }) {
  const { betId } = await params;
  const session = await loadSession();
  const bet = await getBet(db).where({ 'bet.id': betId }).first();
  const bid = await getBid(db).where({ user_id: session.user.id, bet_id: betId }).first();
  console.log(bid);
  return (
    <BetProvider initialBet={bet}>
      <BidProvider initialBid={bid}>
        <div className='flex flex-col w-full h-full'>
          <BetHeader />

          <section className='flex w-full flex-1 items-center flex-col gap-2 py-2 px-default'>
            <div className='flex items-center w-full'>
              <BidDisplay />
            </div>
            <div className='flex w-full flex-1 items-center justify-center'>
              <PoolDisplay />
            </div>
          </section>
          <section className='w-full flex justify-center py-2 px-default'>
            <PlaceBidModalProvider>
              <BetFooter />
            </PlaceBidModalProvider>
          </section>
        </div>
      </BidProvider>
    </BetProvider>
  );
}
