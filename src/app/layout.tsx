import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AppHeader } from '@/components/app-header';
import { UserProvider } from '@/features/users/contexts/user-provider';
import { AuthProvider } from '../providers/auth-provider';
import { AppFooter } from '@/components/app-footer';
import { cookies } from 'next/headers';
import { AnalyticsScript } from '@/components/analytics-script';
import { CookiesWrapper } from '../features/cookies/providers/cookies-wrapper';
import { loadSession } from '@/utils/load-session';
import { WindowResizeManager } from '@/managers/window-resize-manager';

export const metadata: Metadata = {
  title: 'Wagerize - Casual betting game without the hassle of real money.',
  description: 'A web-based game for creating bets using a virtual currency.',
  authors: [{ name: 'oletusarvo', url: 'https://github.com/Oletusarvo' }],
  keywords:
    'betting game, gambling game, virtual currency, friendly wagers, social betting, casual gaming, no real money, fun challenges, multiplayer betting, wager app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentCookies = await cookies();

  return (
    <html lang='en'>
      <head>
        <link
          rel='manifest'
          href='manifest.json'
        />
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
          rel='stylesheet'></link>
        <AnalyticsScript
          enabled={currentCookies.get('wagerize-analytics-enabled')?.value === 'true'}
        />
      </head>
      <CookiesWrapper>
        <AuthProvider>
          <body className='antialiased flex flex-col w-full h-screen'>
            <WindowResizeManager />
            {children}
            <Toaster position='top-center' />
          </body>
        </AuthProvider>
      </CookiesWrapper>
    </html>
  );
}
