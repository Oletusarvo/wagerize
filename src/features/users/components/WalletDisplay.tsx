'use client';

import { useUserContext } from '@/features/users/contexts/UserProvider';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { useClassName } from '@/hooks/useClassName';
import { Casino } from '@mui/icons-material';
import { usePathname } from 'next/navigation';

export function WalletDisplay() {
  const { user, updateSession } = useUserContext();
  const currentBalance = useAnimatedNumber(user?.wallet.balance || 0, 25, true);
  const pathname = usePathname();
  const balance = user
    ? new Intl.NumberFormat('en-US', {
        signDisplay: 'always',
      }).format(currentBalance)
    : 0;

  const className = useClassName([
    'py-2 z-10 backdrop-blur-sm flex gap-1 justify-end font-semibold lg:px-default xs:px-4 items-center bg-white border-b border-slate-200',
    currentBalance > 0 ? 'text-green-600' : currentBalance < 0 ? 'text-red-600' : 'text-accent',
  ]);

  return (
    !pathname.includes('bets/') && (
      <div
        className={className}
        onClick={() => updateSession()}>
        <Casino sx={{ fontSize: '1rem', transform: 'rotate(45deg)' }} />
        <span>{balance}</span>
      </div>
    )
  );
}
