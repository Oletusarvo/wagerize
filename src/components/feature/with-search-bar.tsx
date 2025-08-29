import { SearchBar } from './search-bar';

export function WithSearchBar({ children }: React.PropsWithChildren) {
  return (
    <>
      <SearchBar queryName={'q'} />
      {children}
    </>
  );
}
