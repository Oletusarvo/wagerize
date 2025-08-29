'use client';

import { useCookieNoticeContext } from '@/features/cookies/providers/cookie-notice-provider';
import { ToggleProvider } from '../../../providers/toggle-provider';
import { FormHeading } from '../../../components/ui/form-heading';
import { X } from 'lucide-react';
import { useAppFooterContext } from '../../../components/app-footer';
import { Button } from '@/components/feature/button';

export function CookieNotice(props) {
  const { footerRef } = useAppFooterContext();
  const { enableAnalytics } = useCookieNoticeContext();
  return (
    <div
      {...props}
      className='xs:border-t lg:border-none xs:border-border lg:shadow-lg absolute xs:left-0 xs:bottom-0 lg:left-[50%] lg:-translate-x-[50%] lg:bottom-4 bg-background-light z-10 xs:w-full lg:w-[30%] animate-slide-up flex flex-col gap-4 py-8 px-4'
      style={{ bottom: footerRef.current?.offsetHeight || 0 }}>
      <div className='flex items-center justify-between border-b border-border pb-4'>
        <FormHeading>Cookies</FormHeading>
        <ToggleProvider.Trigger>
          {/**Ditto */}
          <div>
            <Button
              variant='ghost'
              round>
              <X color='white' />
            </Button>
          </div>
        </ToggleProvider.Trigger>
      </div>

      <p className='text-secondary'>
        We use essential cookies for site functionality and smooth navigation. By continuing, only
        these will be used. Choosing 'Consent to all' enables additional cookies, including Google
        Analytics, to help us analyze site traffic and improve your experience.
      </p>

      <ToggleProvider.Trigger>
        <Button
          variant='contained'
          color='accent'
          onClick={() => enableAnalytics('true')}>
          Consent to all
        </Button>
      </ToggleProvider.Trigger>
      <ToggleProvider.Trigger>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => {
            console.log('disabling analytics');
            enableAnalytics('false');
          }}>
          Only necessary
        </Button>
      </ToggleProvider.Trigger>
    </div>
  );
}
