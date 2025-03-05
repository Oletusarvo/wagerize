import { Container } from '@/components/ui/Container';
import { Main } from '@/components/ui/Main';
import { getSession } from '@/utils/getSession';
import { Add, Casino } from '@mui/icons-material';

import Link from 'next/link';

export default async function Dashboard() {
  const session = await getSession();
  return (
    <Main>
      <h1 className='text-xl font-semibold text-gray-500'>Welcome!</h1>
      <div className='grid lg:grid-cols-2 xs:grid-cols-1 w-full lg:gap-4 xs:gap-2 py-4'>
        <Container
          as={Link}
          href='/auth/bets?page=0'>
          <div className='w-full flex gap-4 items-center'>
            <Casino />
            <div className='flex flex-col gap-1'>
              <h1 className='font-semibold'>Bets</h1>
              <p>Browse bets created by you, and others.</p>
            </div>
          </div>
        </Container>
      </div>
    </Main>
  );
}

function BetListing({ title, description }) {
  return (
    <div className='flex flex-col p-2 gap-2 rounded-md border border-border w-full cursor-pointer hover:shadow-md'>
      <div className='flex w-full justify-between items-center'>
        <h1 className='font-semibold'>Bet title</h1>
        <span className='bg-green-500 rounded-full w-4 h-4 aspect-square' />
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem amet distinctio
        aspernatur ut veritatis, enim quod tempora labore. Ullam iste aliquam natus asperiores
        maiores debitis eos possimus fuga exercitationem eaque?
      </p>
    </div>
  );
}
