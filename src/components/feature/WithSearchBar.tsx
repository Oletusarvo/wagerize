import { SearchBar } from './SearchBar';

export function WithSearchBar({ children }: React.PropsWithChildren) {
  return (
    <>
      <SearchBar queryName={'q'} />
      {children}
    </>
  );
}
