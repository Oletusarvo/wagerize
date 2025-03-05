import { useId, useMemo } from 'react';

export function useList<T>(items: T[], Component: React.FC<any>, deps: any[]) {
  const listId = useId();

  return useMemo(
    () =>
      items.map((item, i) => {
        return (
          <Component
            item={item}
            key={`${listId}-${i}`}
          />
        );
      }),
    [items, Component, ...deps]
  );
}
