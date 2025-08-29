import { Main } from '@/components/ui/main-temp';
import { CreateBetForm } from '@/features/bets/components/create-bet-form';

export default async function CreateBetPage() {
  return (
    <div className='flex flex-col items-center xs:justify-start lg:justify-center h-full px-default py-2'>
      <CreateBetForm />
    </div>
  );
}
