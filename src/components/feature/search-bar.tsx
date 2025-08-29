'use client';

import { useSearch } from '@/hooks/use-search';
import { useMemo } from 'react';

import { Spinner } from '../ui/spinner-temp';
import { Search } from 'lucide-react';
import { Input } from '../ui/input-temp';

export function SearchBar({ queryName }) {
  const [updateSearch, status] = useSearch(queryName);

  return (
    <Input
      icon={status === 'loading' ? <Spinner /> : <Search />}
      type='search'
      name={queryName}
      placeholder='Search...'
      onChange={e => updateSearch(e.target.value)}
    />
  );
}
