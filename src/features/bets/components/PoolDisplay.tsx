'use client';

import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { useClassName } from '@/hooks/useClassName';
import { useBetContext } from '../providers/BetProvider';
import { useBidContext } from '@/features/bids/providers/BidProvider';
import { ArrowDownCircle, Dice5 } from 'lucide-react';

export function PoolDisplay() {
  const { bet } = useBetContext();
  const { bid, mustCall } = useBidContext();

  const status = bet.status === 'frozen' ? 'frozen' : bid ? 'participated' : 'open';
  const currentPool = useAnimatedNumber(bet.pool, 25, true);

  const className = useClassName(
    'xs:w-[75%] rounded-full border-2 flex flex-col gap-2 items-center justify-center aspect-square text-2xl text-white',
    mustCall
      ? 'border-accent'
      : status === 'participated'
      ? 'border-red-600'
      : status === 'open'
      ? 'border-green-600'
      : status === 'frozen'
      ? 'border-blue-600'
      : 'border-gray-600'
  );

  return (
    <div className={className}>
      <div className='flex gap-2 items-center'>
        <Dice5 className='rotate-45' />
        <div className='max-w-full overflow-hidden text-nowrap text-ellipsis'>{currentPool}</div>
      </div>
    </div>
  );
}
