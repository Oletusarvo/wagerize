'use client';

import { ArrowDownCircle, ArrowUpCircle, ArrowUpToLine } from 'lucide-react';
import { useBidContext } from '../providers/bid-provider';
import { useState } from 'react';
import { useBetContext } from '@/features/bets/providers/bet-provider';
import { Input } from '@/components/ui/input-temp';

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

  const getMinValue = () => {
    if (!bid) {
      return bet.min_bid;
    } else if (mustCall) {
      return amountToCall;
    } else {
      return bet.min_raise;
    }
  };

  const getMaxValue = () => {
    if (bet.max_raise) {
      return min + bet.max_raise;
    }
  };

  const min = getMinValue();
  const max = getMaxValue();

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
