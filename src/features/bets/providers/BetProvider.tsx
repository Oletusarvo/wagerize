'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { BetType } from '../types/BetType';
import { useState } from 'react';
import { useSocketRooms } from '@/hooks/useSocketRooms';
import { useSocketHandlers } from '@/hooks/useSocketHandlers';
import { TBet } from '../schemas/betSchema';

const [BetContext, useBetContext] = createContextWithHook<{
  bet: TBet;
}>('BetContext');

type BetProviderProps = React.PropsWithChildren & {
  initialBet: TBet;
};

export function BetProvider({ children, initialBet }: BetProviderProps) {
  const [bet, setBet] = useState(initialBet);
  useSocketRooms([`bet:${bet.id}`]);
  useSocketHandlers({
    'bet:update': payload => {
      if (payload.id !== bet.id) return;

      setBet(prev => ({
        ...prev,
        ...payload,
      }));
    },
  });
  return <BetContext.Provider value={{ bet }}>{children}</BetContext.Provider>;
}

export { useBetContext };
