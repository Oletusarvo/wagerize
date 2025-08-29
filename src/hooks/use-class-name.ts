import { createClassName } from '@/utils/create-class-name';
import { useMemo } from 'react';

export function useClassName(...classes: string[]) {
  return useMemo(() => createClassName(...classes), [classes]);
}
