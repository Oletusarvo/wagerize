'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { BetType } from '../types/BetType';
import { useState } from 'react';
import { useSocketRooms } from '@/hooks/useSocketRooms';
import { useSocketHandlers } from '@/hooks/useSocketHandlers';

const [BetContext, useBetContext] = createContextWithHook<{
  bet: BetType;
}>('BetContext');

type BetProviderProps = React.PropsWithChildren & {
  initialBet: BetType;
};

export function BetProvider({ children, initialBet }: BetProviderProps) {
  const [bet, setBet] = useState(initialBet);

  useSocketRooms([`bet:${bet.id}`]);
  useSocketHandlers({
    'bet:bid_placed': payload => {
      if (payload.bet_id !== bet.id) return;
    },
  });
  return <BetContext.Provider value={{ bet }}>{children}</BetContext.Provider>;
}

export { useBetContext };
