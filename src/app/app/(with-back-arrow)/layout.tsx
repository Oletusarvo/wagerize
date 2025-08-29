import { AppFooter } from '@/components/app-footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function WithBackArrowLayout({ children }) {
  return <main className='flex-1 flex flex-col overflow-y-scroll h-full'>{children}</main>;
}
