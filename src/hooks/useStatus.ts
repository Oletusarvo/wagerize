import { useState } from 'react';

export function useStatus() {
  const [status, setStatus] = useState<'idle' | 'done' | 'error' | 'loading'>('idle');
  return [status, setStatus] as const;
}
