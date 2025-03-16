import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/Header';
import Link from 'next/link';
import { Casino } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';
import { AppHeader } from '@/components/AppHeader';
import { UserProvider } from '@/features/users/contexts/UserProvider';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './AuthProvider';
import { AppFooter } from '@/components/AppFooter';
import { ServiceWorkerLoader } from '@/components/ServiceWorkerLoader';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { AnalyticsScript } from '@/components/AnalyticsScript';
import { CookiesProvider } from 'react-cookie';
import { CookiesWrapper } from './CookiesWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Betting App',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentCookies = await cookies();
  console.log(currentCookies.get('wagerize-analytics-enabled'));
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col w-full h-screen flex-1`}>
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
