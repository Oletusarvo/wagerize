import { createContext } from 'react';
import { createUseContextHook } from './createUseContextHook';

export function createContextWithHook<T>(contextName: string) {
  const context = createContext<T | null>(null);
  const useContext = createUseContextHook(context, contextName);
  return [context, useContext] as const;
}
