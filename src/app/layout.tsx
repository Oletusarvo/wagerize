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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='manifest'
          href='manifest.json'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col w-full h-screen flex-1`}>
        <AuthProvider>
          <UserProvider>
            <AppHeader />
            {children}
            <AppFooter />
          </UserProvider>
        </AuthProvider>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
