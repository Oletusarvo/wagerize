'use client';

import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { useClassName } from '@/hooks/useClassName';
import { Casino } from '@mui/icons-material';
import { BetType } from '../types/BetType';
import { Bets } from '../DAL/Bets';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

export function PoolDisplay({ bet }: PoolDisplayProps) {
  const [currentBet, setCurrentBet] = useState(bet);
  const status = bet.data.is_frozen ? 'frozen' : bet.bid ? 'participated' : 'open';
  const currentPool = useAnimatedNumber(currentBet.pool, 25, true);

  const className = useClassName([
    'xs:w-[75%] rounded-full border flex gap-2 items-center justify-center aspect-square text-2xl bg-white',
    status === 'participated'
      ? 'border-red-600'
      : status === 'open'
      ? 'border-green-600'
      : status === 'frozen'
      ? 'border-blue-600'
      : 'border-gray-600',
  ]);

  useEffect(() => {
    const room = `bet-${currentBet.id}`;

    socket.emit('join_room', room);
    socket.on('game_update', data => {
      setCurrentBet(data);
    });

    return () => {
      socket.emit('leave_room', room);
      socket.off('game_update');
    };
  }, []);

  return (
    <div className={className}>
      <Casino sx={{ transform: 'rotate(45deg)' }} />
      <span>{currentPool}</span>
    </div>
  );
}

type PoolDisplayProps = {
  bet: BetType & { bid: any; pool: number };
};
