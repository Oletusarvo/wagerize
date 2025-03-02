import { useContext } from 'react';

export function createUseContextHook<T>(context: React.Context<T>, contextName: string) {
  return () => {
    const ctx = useContext(context);
    if (!ctx) {
      throw new Error(`use${contextName} can only be used within the scope of a ${contextName}!`);
    }
    return ctx;
  };
}
