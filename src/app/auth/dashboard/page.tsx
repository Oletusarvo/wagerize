import { Container } from '@/components/ui/Container';
import { FormHeading } from '@/components/ui/FormHeading';
import { Main } from '@/components/ui/Main';
import { getSession } from '@/utils/getSession';
import { Add, Casino, ManageAccounts, Settings } from '@mui/icons-material';

import Link from 'next/link';

export default async function Dashboard() {
  return (
    <Main>
      <FormHeading>Welcome!</FormHeading>
      <div className='grid lg:grid-cols-2 xs:grid-cols-1 w-full lg:gap-4 xs:gap-2 py-4'>
        <DashboardItem
          href='/auth/bets?page=0&q='
          icon={<Casino sx={{ transform: 'rotate(45deg)' }} />}
          title='Bets'
          description={'Browse bets created by you, and others.'}
        />
        <DashboardItem
          href='/auth/bets/manage'
          icon={<Settings />}
          title='Manage Bets'
          description={'Manage the bets you have created.'}
        />
        <DashboardItem
          href='/auth/dashboard/settings'
          icon={<ManageAccounts />}
          title='Manage Account'
          description={'Manage your account.'}
        />
      </div>
    </Main>
  );
}

const DashboardItem = ({ icon, title, description, href }) => {
  return (
    <Container
      as={Link}
      href={href}>
      <div className='w-full flex gap-4 items-center h-24'>
        {icon}
        <div className='flex flex-col gap-1'>
          <h1 className='font-semibold'>{title}</h1>
          <p className='overflow-hidden'>{description}</p>
        </div>
      </div>
    </Container>
  );
};
