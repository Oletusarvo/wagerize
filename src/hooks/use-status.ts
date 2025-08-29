import { useState } from 'react';

export function useStatus<T extends string>(additionalStatuses: T[] = []) {
  const allStatuses = ['idle', 'success', 'error', 'loading', ...additionalStatuses] as const;
  type StatusT = (typeof allStatuses)[number];
  const [status, setStatus] = useState<StatusT>('idle');
  return [status, setStatus] as const;
}
