'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { useState } from 'react';

const [TransactionsContext, useTransactionsContext] = createContextWithHook('TransactionsContext');

export function TransactionsProvider({ children, initialTransactions }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  return (
    <TransactionsContext.Provider value={{ transactions }}>{children}</TransactionsContext.Provider>
  );
}

export { useTransactionsContext };
