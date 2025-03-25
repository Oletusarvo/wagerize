import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AppHeader } from '@/components/AppHeader';
import { UserProvider } from '@/features/users/contexts/UserProvider';
import { AuthProvider } from './AuthProvider';
import { AppFooter } from '@/components/AppFooter';
import { cookies } from 'next/headers';
import { AnalyticsScript } from '@/components/AnalyticsScript';
import { CookiesWrapper } from './CookiesWrapper';

export const metadata: Metadata = {
  title: 'Wagerize',
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
        <AnalyticsScript
          enabled={currentCookies.get('wagerize-analytics-enabled')?.value === 'true'}
        />
      </head>
      <body className={`antialiased flex flex-col w-full h-screen`}>
        <CookiesWrapper>
          <AuthProvider>
            <UserProvider>
              <AppHeader />
              {children}
              <AppFooter />
            </UserProvider>
          </AuthProvider>
        </CookiesWrapper>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
