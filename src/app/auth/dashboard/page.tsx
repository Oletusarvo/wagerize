import { Container } from '@/components/ui/Container';
import { FormHeading } from '@/components/ui/FormHeading';
import { Main } from '@/components/ui/Main';
import { getSession } from '@/utils/getSession';
import { Add, Casino, ManageAccounts, Money, Settings, Wallet } from '@mui/icons-material';

import Link from 'next/link';

export default async function Dashboard() {
  return (
    <Main>
      <FormHeading>Welcome!</FormHeading>
      <div className='grid lg:grid-cols-2 xs:grid-cols-1 w-full lg:gap-4 xs:gap-2 py-4'>
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
          <h3 className='font-semibold'>{title}</h3>
          <p className='overflow-hidden'>{description}</p>
        </div>
      </div>
    </Container>
  );
};
