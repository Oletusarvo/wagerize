import { useState } from 'react';

export function useBatch() {
  const [batch, setBatch] = useState([]);
  const add = (item: any) => setBatch([...batch, item]);
  const del = (item: any) => setBatch(batch.filter(i => i !== item));

  return { batch, add, del };
}
