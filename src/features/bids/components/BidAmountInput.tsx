'use client';

import { ArrowDownCircle, ArrowUpCircle, ArrowUpToLine } from 'lucide-react';
import { useBidContext } from '../providers/BidProvider';
import { useState } from 'react';
import { useBetContext } from '@/features/bets/providers/BetProvider';
import { Input } from '@/components/ui/Input';

export function BidAmountInput() {
  const { bet } = useBetContext();
  const { bid, mustCall, amountToCall } = useBidContext();

  const [value, setValue] = useState(() => {
    return !bid ? bet.min_bid : mustCall ? amountToCall : 0;
  });

  const icon =
    value == bet.min_bid + bet.max_raise ? (
      <ArrowUpToLine />
    ) : value > bet.min_bid ? (
      <ArrowUpCircle />
    ) : (
      <ArrowDownCircle />
    );

  const min = !bid ? bet.min_bid : mustCall ? amountToCall : bet.min_raise || 0;
  const max = min + bet.max_raise;

  return (
    <Input
      icon={icon}
      name='amount'
      type='number'
      defaultValue={value}
      onChange={e => setValue(e.target.valueAsNumber)}
      min={min}
      step={bet.min_raise && value < bet.min_raise ? bet.min_raise - value : 1}
      max={max}
    />
  );
}
