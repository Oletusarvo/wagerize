'use client';

import { Dice5 } from 'lucide-react';
import { useWalletContext } from '../providers/wallet-provider';
import { useAnimatedNumber } from '@/hooks/use-animated-number';
import { useEffect, useRef, useState } from 'react';
import { useClassName } from '@/hooks/use-class-name';

export function WalletBalanceDisplay() {
  const { wallet } = useWalletContext();
  const [showDifference, setShowDifference] = useState(false);
  const [difference, setDifference] = useState(0);

  const balanceRef = useRef(wallet.balance);
  const animatedBalance = useAnimatedNumber(wallet.balance, 25, true);
  const formatWithSign = new Intl.NumberFormat('en-US', {
    signDisplay: 'always',
  });

  useEffect(() => {
    const difference = wallet.balance - balanceRef.current;
    if (difference === 0) return;
    balanceRef.current = wallet.balance;
    setDifference(difference);
    setShowDifference(true);
    const t = setTimeout(() => setShowDifference(false), 3000);
    return () => {
      clearTimeout(t);
    };
  }, [wallet.balance]);

  const className = useClassName(
    'flex gap-1 w-full items-center px-default py-2 justify-end bg-background-light font-semibold',
    wallet.balance < 0 ? 'text-red-400' : 'text-green-400'
  );
  return (
    <div className={className}>
      {showDifference ? <DifferenceDisplay difference={difference} /> : null}
      <span>{formatWithSign.format(animatedBalance)}</span>{' '}
      <Dice5
        size='16px'
        className='rotate-45'
      />
    </div>
  );
}

function DifferenceDisplay({ difference }) {
  const formatWithSign = new Intl.NumberFormat('en-US', {
    signDisplay: 'always',
  });

  const className = useClassName(difference < 0 ? 'text-red-400' : 'text-green-400');
  return <div className={className}>{formatWithSign.format(difference)}</div>;
}
