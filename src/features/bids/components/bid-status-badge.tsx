'use client';

import { useBidContext } from '../providers/bid-provider';

export function BidStatusBadge() {
  const { bid, isFolded, mustCall } = useBidContext();
  return (
    bid && (
      <div
        className='rounded-[100px] flex py-1 px-2 text-xs'
        style={{
          color: !bid || isFolded ? 'white' : 'var(--color-yellow-500)',
          backgroundColor: !bid
            ? '#fff2'
            : isFolded
            ? 'hsl(from var(--color-gray-500) h s l / 0.4)'
            : mustCall
            ? 'hsl(from var(--color-yellow-500) h s l / 0.4)'
            : 'transparent',
        }}>
        {isFolded ? 'Folded' : mustCall ? 'Must Call' : null}
      </div>
    )
  );
}
