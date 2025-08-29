'use client';
import { useBidContext } from '@/features/bids/providers/bid-provider';
import { useBetContext } from '../providers/bet-provider';
import { PlaceBidButton } from '@/features/bids/components/place-bid-button';
import { FoldBidButton } from '@/features/bids/components/fold-bid-button';
import { EndBetButton } from './end-bet-button';
import { useUserContext } from '@/features/users/contexts/user-provider';
import { FreezeBetButton } from './freeze-bet-button';
import { ActivateBetButton } from './activate-bet-button';

export function BetFooter() {
  const { bet, isExpired, isFrozen } = useBetContext();
  const { bid, mustCall, isFolded } = useBidContext();
  const { user } = useUserContext();
  return (
    <div className='flex items-center justify-center gap-4 w-full px-2'>
      {!isFolded ? (
        <>
          <PlaceBidButton />
          {bid && mustCall && <FoldBidButton />}

          {user.id === bet.author_id ? (
            !bet.expires_at || isExpired ? (
              <EndBetButton />
            ) : !isFrozen ? (
              <FreezeBetButton />
            ) : (
              <ActivateBetButton />
            )
          ) : null}
        </>
      ) : null}
    </div>
  );
}
