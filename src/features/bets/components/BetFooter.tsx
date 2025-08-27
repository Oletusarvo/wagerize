'use client';
import { useBidContext } from '@/features/bids/providers/BidProvider';
import { useBetContext } from '../providers/BetProvider';
import { ArrowDownCircle, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/feature/Button';
import Link from 'next/link';
import { PlaceBidButton } from '@/features/bids/components/PlaceBidButton';
import { FoldBidButton } from '@/features/bids/components/FoldBidButton';

export function BetFooter() {
  return (
    <div className='flex items-center justify-center gap-4 w-full px-2'>
      <PlaceBidButton />
      <FoldBidButton />
    </div>
  );
}
