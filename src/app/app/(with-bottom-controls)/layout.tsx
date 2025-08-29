import { AppFooter } from '@/components/app-footer';
import { Button } from '@/components/feature/button-temp';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function WithBottomControlsLayout({ children }) {
  return (
    <>
      <main className='flex-1 flex flex-col overflow-y-scroll px-default py-2 gap-2'>
        {children}
      </main>
      <AppFooter>
        <Link href='/app/bets/create'>
          <Button
            variant='ghost'
            round>
            <Plus />
          </Button>
        </Link>
      </AppFooter>
    </>
  );
}
