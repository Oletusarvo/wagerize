import { Main } from '@/components/ui/Main';
import { CreateBetForm } from '@/features/bets/components/CreateBetForm';

export default async function CreateBetPage() {
  return (
    <div className='flex flex-col items-center xs:justify-start lg:justify-center h-full px-default py-2'>
      <CreateBetForm />
    </div>
  );
}
