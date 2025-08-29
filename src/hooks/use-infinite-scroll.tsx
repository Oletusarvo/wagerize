import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useStatus } from './use-status';
import { Spinner } from '@/components/ui/spinner-temp';

export function useInfiniteScroll({
  fetchFn,
  resultsOnPage,
  numPages,
  page = 0,
}: {
  fetchFn: (currentPage: number, resultsOnPage: number) => Promise<any>;
  resultsOnPage: number;
  numPages: number;
  page?: number;
}) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [status, setStatus] = useStatus();
  const { inView, ref } = useInView();
  const pageEndTrigger = (
    <div
      ref={ref}
      className='w-full flex justify-center text-slate-500'>
      {status === 'loading' ? <Spinner /> : currentPage === numPages ? 'No more data' : 'Load more'}
    </div>
  );

  useEffect(() => {
    console.log('Running infinite scroll...', inView, currentPage < numPages, status === 'idle');
    if (inView && currentPage < numPages && status === 'idle') {
      //Fetch more data
      setStatus('loading');

      fetchFn(currentPage, resultsOnPage)
        .then(data => {
          setData(prev => {
            return [...prev, ...data];
          });
        })
        .finally(() => {
          setStatus('idle');
          setCurrentPage(currentPage + 1);
        });
    }
  });

  return { data, pageEndTrigger };
}
