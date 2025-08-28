'use client';

import { capitalize } from '@/utils/capitalize';
import { useBetContext } from '../providers/BetProvider';

export function BetStatusBadge() {
  const { bet, isExpired, isFrozen, isPending } = useBetContext();
  return (
    <div
      className='rounded-[100px] flex py-1 px-2 text-xs'
      style={{
        color: isExpired
          ? 'var(--color-red-300)'
          : isFrozen
          ? 'var(--color-blue-300)'
          : isPending
          ? 'var(--color-yellow-300)'
          : 'var(--color-green-300)',

        backgroundColor: isExpired
          ? 'hsl(from var(--color-red-500) h s l / 0.4)'
          : isFrozen
          ? 'hsl(from var(--color-blue-500) h s l / 0.4)'
          : isPending
          ? 'hsl(from var(--color-yellow-500) h s l / 0.4)'
          : 'hsl(from var(--color-green-500) h s l / 0.4)',
      }}>
      {isExpired ? 'Expired' : capitalize(bet.status)}
    </div>
  );
}
