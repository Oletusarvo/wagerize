import { createClassName } from '@/utils/createClassName';
import { useMemo } from 'react';

export function useClassName(...classes: string[]) {
  return useMemo(() => createClassName(...classes), [classes]);
}
