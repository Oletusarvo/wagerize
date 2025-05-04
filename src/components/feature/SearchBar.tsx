'use client';

import { useSearch } from '@/hooks/useSearch';
import { Search } from '@mui/icons-material';
import { useMemo } from 'react';
import { Input } from '../ui/Input';
import { Spinner } from '../ui/Spinner';

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
