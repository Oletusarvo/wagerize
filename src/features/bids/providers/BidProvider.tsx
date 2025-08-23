'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { useState } from 'react';

const [BidContext, useBidContext] = createContextWithHook<{
  bid: any;
}>('BidContext');

export function BidProvider({ children, initialBid }) {
  const [bid, setBid] = useState(initialBid);
  return <BidContext.Provider value={{ bid }}>{children}</BidContext.Provider>;
}

export { useBidContext };
