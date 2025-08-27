'use client';

import { useBetContext } from '@/features/bets/providers/BetProvider';
import { useUserContext } from '@/features/users/contexts/UserProvider';
import { useSocketHandlers } from '@/hooks/useSocketHandlers';
import { useSocketRooms } from '@/hooks/useSocketRooms';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { createFormData } from '@/utils/createFormData';
import { useState } from 'react';
import { updateBidAction } from '../actions/updateBidAction';

const [BidContext, useBidContext] = createContextWithHook<{
  bid: any;
  mustCall: boolean;
  amountToCall: number;
  fold: () => Promise<void>;
}>('BidContext');

export function BidProvider({ children, initialBid }) {
  const { user } = useUserContext();
  const { bet } = useBetContext();
  const [bid, setBid] = useState(initialBid);
  const mustCall = bid?.amount < bet.min_bid;
  const amountToCall = mustCall && bid ? bet.min_bid - bid.amount : null;

  const fold = async () => {
    if (!bid) return;
    await updateBidAction(
      createFormData({
        id: bid.id,
        status: 'folded',
      })
    );
  };

  useSocketRooms([`bet:${bet.id}`]);
  useSocketHandlers({
    'bet:bid_placed': payload => {
      if (payload.user_id !== user.id || payload.bet_id !== bet.id) return;
      console.log(payload);
      setBid(prev => ({
        ...prev,
        amount: payload.amount,
      }));
    },
  });

  return (
    <BidContext.Provider value={{ bid, mustCall, amountToCall, fold }}>
      {children}
    </BidContext.Provider>
  );
}

export { useBidContext };
