'use client';

import { useSearch } from '@/hooks/useSearch';
import { useMemo } from 'react';

export function SearchBar({ queryName }) {
  const updateSearch = useSearch(queryName);
  const input = useMemo(
    () => (
      <input
        type='search'
        name={queryName}
        placeholder='Search...'
        onChange={e => updateSearch(e.target.value)}
      />
    ),
    [queryName, updateSearch]
  );

  return input;
}
