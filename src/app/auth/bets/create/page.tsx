import { Main } from '@/components/ui/Main';
import { CreateBetForm } from '@/features/bets/components/CreateBetForm';

export default async function CreateBet() {
  return (
    <div className='flex flex-col py-4 overflow-y-scroll items-center xs:justify-start lg:justify-center h-full px-default'>
      <CreateBetForm />
    </div>
  );
}
