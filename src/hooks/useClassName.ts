import { useMemo } from 'react';

export function useClassName(classes: string[]) {
  return useMemo(() => classes.join(' ').trim(), [classes]);
}
