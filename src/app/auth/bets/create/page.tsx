import { Main } from '@/components/ui/Main';
import { CreateBetForm } from '@/features/bets/components/CreateBetForm';

export default async function CreateBet() {
  return (
    <main className='flex flex-col xs:px-4 lg:px-default py-4 flex-1 overflow-y-scroll items-center xs:justify-start lg:justify-center'>
      <CreateBetForm />
    </main>
  );
}
