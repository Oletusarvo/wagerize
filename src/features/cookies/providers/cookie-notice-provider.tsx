'use client';

import { CookieNotice } from '@/features/cookies/components/cookie-notice';
import { ToggleProvider } from '@/providers/toggle-provider';
import { useAppCookies } from '@/hooks/use-app-cookies';
import { createContextWithHook } from '@/utils/create-context-with-hook';
import { useState } from 'react';

const [CookieNoticeContext, useCookieNoticeContext] = createContextWithHook<{
  cookieNoticeOpen: boolean;
  toggleCookieNotice: (state: boolean) => void;
  enableAnalytics: (state?: string) => void;
}>('CookieNoticeContext');

export function CookieNoticeProvider({ children }) {
  const { showCookieNotice, enableAnalytics } = useAppCookies();

  const [cookieNoticeOpen, setCookieNoticeOpen] = useState<boolean>(() => {
    if (showCookieNotice) {
      return showCookieNotice === 'true' ? true : false;
    } else {
      return true;
    }
  });

  const toggleCookieNotice = (state: boolean) => setCookieNoticeOpen(state);

  return (
    <CookieNoticeContext.Provider value={{ cookieNoticeOpen, toggleCookieNotice, enableAnalytics }}>
      <ToggleProvider
        initialState={cookieNoticeOpen}
        onChange={state => toggleCookieNotice(state)}>
        {children}
        <ToggleProvider.Target hideOnClickOutside>
          <CookieNotice />
        </ToggleProvider.Target>
      </ToggleProvider>
    </CookieNoticeContext.Provider>
  );
}

export { useCookieNoticeContext };
