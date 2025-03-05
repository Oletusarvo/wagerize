'use client';

import { Container } from '@/components/ui/Container';
import { ArrowDownward, Wallet } from '@mui/icons-material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BetListing } from './BetListing';

export function BetList({ bets }) {
  const [betsToShow, setBetsToShow] = useState(bets);
  useEffect(() => setBetsToShow(bets), [bets]);

  return (
    <div className='flex flex-col gap-2 w-full flex-1'>
      <div className='flex justify-between w-full'>
        <input
          type='search'
          name='q'
          placeholder='Search...'
          className='w-full'
          onChange={e => {
            setBetsToShow(prev =>
              e.target.value !== '' ? prev.filter(b => b.data.title.includes(e.target.value)) : bets
            );
          }}
        />
      </div>
      {betsToShow.map((b, i) => {
        return (
          <BetListing
            bet={b}
            key={`bet-listing-${i}`}
          />
        );
      })}
    </div>
  );
}
