import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';
import { CookieNoticeTrigger } from '@/features/cookies/components/cookie-notice-trigger';
import { CookieNoticeProvider } from '@/features/cookies/providers/cookie-notice-provider';
import { MainMenuProvider } from '@/features/main-menu/providers/main-menu-provider';

export default async function SiteLayout({ children }) {
  return (
    <>
      <AppHeader />

      <main className='flex-1 flex flex-col overflow-y-scroll'>{children}</main>
      <AppFooter>
        <CookieNoticeProvider>
          <CookieNoticeTrigger />
        </CookieNoticeProvider>
      </AppFooter>
    </>
  );
}
