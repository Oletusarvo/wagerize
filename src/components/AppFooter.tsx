'use client';

import { ToggleProvider } from './feature/ToggleProvider';
import { useRef, useState } from 'react';
import { FormHeading } from './ui/FormHeading';
import { useAppCookies } from '@/hooks/useAppCookies';
import { Cookie, X } from 'lucide-react';

export function AppFooter() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const { showCookieNotice, enableAnalytics } = useAppCookies();
  const [cookieNoticeOpen, setCookieNoticeOpen] = useState<boolean>(() => {
    if (showCookieNotice) {
      return showCookieNotice === 'true' ? true : false;
    } else {
      return true;
    }
  });

  return (
    <div
      ref={footerRef}
      className='relative lg:px-default xs:px-4 py-4 z-30 app-footer flex gap-8 items-center justify-center h-[70px] bg-background-light border-t border-border'>
      <ToggleProvider
        initialState={cookieNoticeOpen}
        onChange={state => setCookieNoticeOpen(state)}>
        <ToggleProvider.Trigger>
          {/**Must be wrapped within a div, because the IconButton ignores class names. The Trigger passes a mandatory class name to its children. */}
          <div>
            <button className='button --round --ghost text-accent'>
              {!cookieNoticeOpen ? <Cookie /> : <X />}
            </button>
          </div>
        </ToggleProvider.Trigger>
        <ToggleProvider.Target hideOnClickOutside>
          <div
            className='xs:border-t lg:border-none xs:border-border lg:shadow-lg absolute xs:left-0 xs:bottom-0 lg:left-[50%] lg:-translate-x-[50%] lg:bottom-4 bg-background-light z-10 xs:w-full lg:w-[30%] animate-slide-up flex flex-col gap-4 py-8 px-4'
            style={{ bottom: footerRef.current?.offsetHeight || 0 }}>
            <div className='flex items-center justify-between border-b border-border pb-4'>
              <FormHeading>Cookies</FormHeading>
              <ToggleProvider.Trigger>
                {/**Ditto */}
                <div>
                  <button className='button text-accent --ghost --round'>
                    <X />
                  </button>
                </div>
              </ToggleProvider.Trigger>
            </div>

            <p className='text-secondary'>
              We use essential cookies for site functionality and smooth navigation. By continuing,
              only these will be used. Choosing 'Consent to all' enables additional cookies,
              including Google Analytics, to help us analyze site traffic and improve your
              experience.
            </p>

            <ToggleProvider.Trigger>
              <button
                className='button contained --accent w-full'
                onClick={() => enableAnalytics('true')}>
                Consent to all
              </button>
            </ToggleProvider.Trigger>
            <ToggleProvider.Trigger>
              <button
                className='button w-full outlined --accent'
                onClick={() => {
                  console.log('disabling analytics');
                  enableAnalytics('false');
                }}>
                Only necessary
              </button>
            </ToggleProvider.Trigger>
          </div>
        </ToggleProvider.Target>
      </ToggleProvider>
    </div>
  );
}
