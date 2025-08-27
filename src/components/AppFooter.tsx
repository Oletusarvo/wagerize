'use client';

import { RefObject, useRef } from 'react';
import { createContextWithHook } from '@/utils/createContextWithHook';

const [AppFooterContext, useAppFooterContext] = createContextWithHook<{
  footerRef: RefObject<HTMLDivElement | null>;
}>('AppFooterContext');

export { useAppFooterContext };

export function AppFooter({ children }: React.PropsWithChildren) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  return (
    <AppFooterContext.Provider value={{ footerRef }}>
      <div
        ref={footerRef}
        className='relative lg:px-default px-default py-2 z-30 app-footer flex gap-8 items-center justify-center h-[70px] bg-background-light border-t border-border'>
        {children}
      </div>
    </AppFooterContext.Provider>
  );
}
