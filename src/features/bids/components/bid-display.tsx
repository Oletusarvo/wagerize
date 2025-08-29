'use client';

import { ArrowDownCircle } from 'lucide-react';
import { useBidContext } from '../providers/bid-provider';
import { BidStatusBadge } from './bid-status-badge';

export function BidDisplay() {
  const { bid } = useBidContext();

  return (
    <div className='flex gap-2 items-center text-sm w-full justify-between'>
      <div className='flex gap-2 items-center'>
        <ArrowDownCircle />
        <div>
          {bid?.amount || 'No bid yet.'} {bid && `on ${bid.outcome}`}
        </div>
        <BidStatusBadge />
      </div>

      <span></span>
    </div>
  );
}
