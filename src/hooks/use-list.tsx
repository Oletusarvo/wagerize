import { ReactNode, useId, useMemo } from 'react';

export function useList<T>({
  items,
  Component,
  onEmpty,
  deps,
}: {
  items: T[];
  Component: React.FC<any>;
  onEmpty?: ReactNode;
  deps: any[];
}) {
  const listId = useId();

  return useMemo(
    () =>
      items.length > 0
        ? items.map((item, i) => {
            return (
              <Component
                item={item}
                key={`${listId}-${i}`}
              />
            );
          })
        : onEmpty,
    [items, Component, onEmpty, ...deps]
  );
}
