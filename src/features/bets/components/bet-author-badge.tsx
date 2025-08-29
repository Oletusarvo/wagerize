'use client';

import { DataPoint } from '@/components/data-point';
import { useBetContext } from '../providers/bet-provider';
import { AtSign } from 'lucide-react';

export function BetAuthorBadge() {
  const { bet } = useBetContext();
  return (
    <div className='py-1 px-2 rounded-[100px] bg-[#fff2] text-[14px]'>
      <DataPoint
        IconComponent={AtSign}
        content={bet.author}
      />
    </div>
  );
}
