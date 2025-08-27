'use client';

import { ArrowDownCircle } from 'lucide-react';
import { useBidContext } from '../providers/BidProvider';

export function BidDisplay() {
  const { bid } = useBidContext();

  return (
    <div className='flex gap-2 items-center text-sm'>
      <ArrowDownCircle />
      <div>{bid?.amount || 'No bid yet.'}</div>
    </div>
  );
}
