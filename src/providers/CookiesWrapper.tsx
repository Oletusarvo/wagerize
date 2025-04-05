'use client';

import { CookiesProvider } from 'react-cookie';

export function CookiesWrapper({ children }) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
