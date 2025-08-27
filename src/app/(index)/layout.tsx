import { AppFooter } from '@/components/AppFooter';
import { AppHeader } from '@/components/AppHeader';
import { CookieNoticeTrigger } from '@/features/cookies/components/CookieNoticeTrigger';
import { CookieNoticeProvider } from '@/features/cookies/providers/CookieNoticeProvider';
import { MainMenuProvider } from '@/features/mainMenu/providers/MainMenuProvider';

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
