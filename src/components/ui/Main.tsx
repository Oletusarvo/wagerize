'use client';

import { useMemo } from 'react';

export function Main({ children, centered = false }) {
  const className = useMemo(() => {
    return [
      'flex w-full flex-1 lg:px-default xs:px-4 flex-col py-4 overflow-y-scroll',
      centered ? 'items-center justify-center' : 'items-normal justify-normal',
    ]
      .join(' ')
      .trim();
  }, [centered]);

  return <main className={className}>{children}</main>;
}
