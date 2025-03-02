'use client';

import { Container } from '@/components/ui/Container';
import { ArrowDownward } from '@mui/icons-material';
import { useState } from 'react';

export function BetList({ bets }) {
  const [betsToShow, setBetsToShow] = useState(bets);

  return (
    <div className='flex flex-col gap-4 w-full flex-1'>
      <div className='flex justify-between w-full'>
        <input
          type='search'
          name='search'
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
          <Container
            as='div'
            key={`bet-${b.id}`}>
            <div className='flex w-full justify-between items-center'>
              <h1 className='font-semibold'>{b.data.title}</h1>
              <span className='w-2 h-2 aspect-square bg-green-600 rounded-full' />
            </div>

            <p className='text-gray-600'>{b.data.description || 'No description.'}</p>
            <div className='flex gap-2 items-center'>
              <ArrowDownward sx={{ color: 'var(--color-gray-100)' }} />
              <span>{b.data.min_bid}</span>
            </div>
          </Container>
        );
      })}
    </div>
  );
}
