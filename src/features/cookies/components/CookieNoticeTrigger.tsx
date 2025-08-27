'use client';

import { Cookie, X } from 'lucide-react';
import { ToggleProvider } from '../../../providers/ToggleProvider';
import { useCookieNoticeContext } from '@/features/cookies/providers/CookieNoticeProvider';
import { Button } from '@/components/feature/Button';

export function CookieNoticeTrigger() {
  const { cookieNoticeOpen } = useCookieNoticeContext();
  return (
    <ToggleProvider.Trigger>
      {/**Must be wrapped within a div, because the IconButton ignores class names. The Trigger passes a mandatory class name to its children. */}
      <div>
        <Button
          round
          variant='ghost'
          color='accent'>
          {!cookieNoticeOpen ? <Cookie color='white' /> : <X color='white' />}
        </Button>
      </div>
    </ToggleProvider.Trigger>
  );
}
