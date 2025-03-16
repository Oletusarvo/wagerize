'use client';

import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { useClassName } from '@/hooks/useClassName';
import { Casino } from '@mui/icons-material';

export function PoolDisplay({ amount, status = 'neutral' }: PoolDisplayProps) {
  const currentPool = useAnimatedNumber(amount, 25, true);

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

  return (
    <div className={className}>
      <Casino sx={{ transform: 'rotate(45deg)' }} />
      <span>{currentPool}</span>
    </div>
  );
}

type PoolDisplayProps = {
  status?: 'participated' | 'open' | 'frozen' | 'neutral';
  amount: number;
  minimum: number;
};
