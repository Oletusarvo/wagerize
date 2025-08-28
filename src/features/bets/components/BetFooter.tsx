'use client';
import { useBidContext } from '@/features/bids/providers/BidProvider';
import { useBetContext } from '../providers/BetProvider';
import { ArrowDownCircle, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/feature/Button';
import Link from 'next/link';
import { PlaceBidButton } from '@/features/bids/components/PlaceBidButton';
import { FoldBidButton } from '@/features/bids/components/FoldBidButton';
import { EndBetButton } from './EndBetButton';
import { useUserContext } from '@/features/users/contexts/UserProvider';
import { FreezeBetButton } from './FreezeBetButton';
import { ActivateBetButton } from './ActivateBetButton';

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
