import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useSearch(paramName: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearch = useCallback(
    (newSearch: string | number) => {
      console.log('Updating search...');
      const newParams = new URLSearchParams(searchParams);
      newParams.set(paramName, typeof newSearch === 'number' ? newSearch.toString() : newSearch);
      router.replace(`${pathname}?${newParams.toString()}`);
    },
    [paramName, router, searchParams]
  );

  return updateSearch;
}
