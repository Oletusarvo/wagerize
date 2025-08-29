'use client';

import { ArrowDownCircle } from 'lucide-react';
import { useBidContext } from '../providers/bid-provider';
import { useClassName } from '@/hooks/use-class-name';
import { DataPoint } from '@/components/data-point';

export function PlacedBidIndicator() {
  const { bid, mustCall } = useBidContext();
  const className = useClassName(
    'flex gap-4 p-2 rounded-[100px]',
    mustCall ? 'text-yellow-500' : 'text-white'
  );
  return (
    <div
      className={className}
      style={{
        backgroundColor: mustCall ? 'hsl(from var(--color-yellow-500) h s l / 0.1)' : '#fff1',
      }}>
      <DataPoint
        IconComponent={ArrowDownCircle}
        content={bid.amount}
      />
    </div>
  );
}
