import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AppHeader } from '@/components/AppHeader';
import { UserProvider } from '@/features/users/contexts/UserProvider';
import { AuthProvider } from '../providers/AuthProvider';
import { AppFooter } from '@/components/AppFooter';
import { cookies } from 'next/headers';
import { AnalyticsScript } from '@/components/AnalyticsScript';
import { CookiesWrapper } from '../providers/CookiesWrapper';

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
      <body className={`antialiased flex flex-col w-full h-screen`}>
        <CookiesWrapper>
          <AuthProvider>
            <UserProvider>
              <AppHeader />
              <main className='flex flex-col w-full flex-1 overflow-y-scroll'>{children}</main>
              <AppFooter />
            </UserProvider>
          </AuthProvider>
        </CookiesWrapper>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
