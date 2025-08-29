'use client';

import { useBetContext } from '@/features/bets/providers/bet-provider';
import { useUserContext } from '@/features/users/contexts/user-provider';
import { useSocketHandlers } from '@/hooks/use-socket-handlers';
import { useSocketRooms } from '@/hooks/use-socket-rooms';
import { createContextWithHook } from '@/utils/create-context-with-hook';
import { createFormData } from '@/utils/create-form-data';
import { useState } from 'react';
import { updateBidAction } from '../actions/update-bid-action';

const [BidContext, useBidContext] = createContextWithHook<{
  bid: any;
  mustCall: boolean;
  amountToCall: number;
  isFolded: boolean;
  fold: () => Promise<void>;
}>('BidContext');

export function BidProvider({ children, initialBid }) {
  const { user } = useUserContext();
  const { bet } = useBetContext();
  const [bid, setBid] = useState(initialBid);
  const mustCall = bid?.amount < bet.min_bid;
  const amountToCall = mustCall && bid ? bet.min_bid - bid.amount : null;
  const isFolded = bid?.status === 'folded';

  const fold = async () => {
    if (!bid) return;

    await updateBidAction(
      createFormData({
        id: bid.id,
        status: 'folded',
      })
    ).then(() => {
      setBid({ ...bid, status: 'folded' });
    });
  };

  useSocketRooms([`bet:${bet.id}`]);
  useSocketHandlers({
    'bet:bid_placed': payload => {
      if (payload.user_id !== user.id || payload.bet_id !== bet.id) return;
      console.log('Bid: ', payload);
      setBid(prev => ({
        ...prev,

        amount: payload.amount || bid?.amount,
        status: payload.status || bid?.status,
        outcome: payload.outcome,
      }));
    },
  });

  return (
    <BidContext.Provider value={{ bid, mustCall, amountToCall, isFolded, fold }}>
      {children}
    </BidContext.Provider>
  );
}

export { useBidContext };
