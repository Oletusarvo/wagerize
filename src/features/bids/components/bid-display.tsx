'use client';

import { ArrowDownCircle, Check } from 'lucide-react';
import { useBidContext } from '../providers/bid-provider';
import { BidStatusBadge } from './bid-status-badge';

export function BidDisplay() {
  const { bid } = useBidContext();

  return (
    <div className='flex gap-2 items-center text-sm w-full justify-between'>
      <div className='flex gap-2 items-center'>
        <ArrowDownCircle />
        <div>{bid?.amount || 'No bid yet.'}</div>
        <BidStatusBadge />
      </div>

      <div
        className='flex gap-2 items-center py-1 px-4 rounded-[100px] border border-background-light'
        style={{
          backgroundColor: 'hsl(from var(--color-background-light) h s l / 0.5)',
        }}>
        <Check
          size='14px'
          color='white'
        />
        {bid?.outcome}
      </div>
    </div>
  );
}
