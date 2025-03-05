'use client';

import { useList } from '@/hooks/useList';
import { BetListing } from './BetListing';
import { SearchBar } from '@/components/feature/SearchBar';

export function BetList({ bets }) {
  const content = useList(
    bets,
    ({ item }) => {
      return <BetListing bet={item} />;
    },
    []
  );

  return (
    <div className='flex flex-col gap-2 w-full flex-1'>
      <SearchBar queryName='q' />
      {content}
    </div>
  );
}
