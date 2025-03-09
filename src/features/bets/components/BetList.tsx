'use client';

import { useList } from '@/hooks/useList';
import { BetListing } from './BetListing';
import { SearchBar } from '@/components/feature/SearchBar';

export function BetList({ bets }) {
  const content = useList({
    items: bets,
    Component: ({ item }) => {
      return <BetListing bet={item} />;
    },
    onEmpty: <span>No bets.</span>,
    deps: [],
  });

  return (
    <div className='flex flex-col gap-2 w-full flex-1'>
      <SearchBar queryName='q' />
      <div className='grid xs:grid-cols-1 lg:grid-cols-2 xs:gap-2 lg:gap-4'>{content}</div>
    </div>
  );
}
