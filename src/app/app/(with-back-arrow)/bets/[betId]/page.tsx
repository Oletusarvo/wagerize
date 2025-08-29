import { Button } from '@/components/feature/button-temp';
import { BetFooter } from '@/features/bets/components/bet-footer';
import { BetHeader } from '@/features/bets/components/bet-header';
import { PlaceBidButton } from '@/features/bids/components/place-bid-button';
import { PoolDisplay } from '@/features/bets/components/pool-display';
import { getBet } from '@/features/bets/DAL/get-bet';
import { BetProvider } from '@/features/bets/providers/bet-provider';
import { BidDisplay } from '@/features/bids/components/bid-display';
import { getBid } from '@/features/bids/dal/get-bid';
import { BidProvider } from '@/features/bids/providers/bid-provider';
import { tablenames } from '@/tablenames';
import { loadSession } from '@/utils/load-session';
import db from 'betting_app/dbconfig';
import Link from 'next/link';
import { ReactNode } from 'react';
import { PlaceBidModalProvider } from '@/features/bids/providers/place-bid-modal-provider';
import { betService } from '@/features/bets/services/bet-service';
import { bidService } from '@/features/bids/services/bid-service';

export default async function BetPage({ params }) {
  const { betId } = await params;
  const session = await loadSession();
  const bet = await betService.repo.findById(betId, db);
  const bid = await bidService.repo.findBy({ user_id: session.user.id, bet_id: betId }, db).first();

  console.log('Bid: ', bid);
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
