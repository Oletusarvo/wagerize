'use client';

import { useList } from '@/hooks/useList';
import { BetListing } from './BetListing';
import { SearchBar } from '@/components/feature/SearchBar';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getBets } from '../actions/getBets';

export function BetList({ betsOnPage, numPages, search }) {
  const { data, pageEndTrigger } = useInfiniteScroll({
    fetchFn: async (currentPage: number, resultsOnPage: number) => {
      console.log(search);
      return await getBets(currentPage, resultsOnPage, search);
    },
    resultsOnPage: betsOnPage,
    numPages,
    page: 0,
  });

  const content = useList({
    items: data,
    Component: ({ item }) => {
      return <BetListing bet={item} />;
    },
    onEmpty: <span>No Bets.</span>,
    deps: [],
  });

  return (
    <div className='flex flex-col gap-2 w-full flex-1'>
      <SearchBar queryName='q' />
      <div className='grid xs:grid-cols-1 lg:grid-cols-2 xs:gap-2 lg:gap-4'>
        {content}
        {pageEndTrigger}
      </div>
    </div>
  );
}
