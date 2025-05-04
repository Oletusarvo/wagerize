import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useStatus } from './useStatus';

export function useSearch(paramName: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentSearch, setCurrentSearch] = useState(null);
  const [status, setStatus] = useStatus();

  const updateSearch = useCallback(
    (newSearch: string) => {
      setStatus('loading');
      //const searchAsInt = parseInt(newSearch);
      setCurrentSearch(newSearch);
    },
    [paramName, router, searchParams, setStatus]
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if (currentSearch !== null) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(paramName, currentSearch);
        router.replace(`${pathname}?${newParams.toString()}`);
        setStatus('idle');
      }
    }, 500);
    return () => clearTimeout(t);
  }, [currentSearch]);

  return [updateSearch, status] as const;
}
