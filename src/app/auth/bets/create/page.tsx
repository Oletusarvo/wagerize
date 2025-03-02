import { Main } from '@/components/ui/Main';
import { CreateBetForm } from '@/features/bets/components/CreateBetForm';

export default async function CreateBet() {
  return (
    <Main centered>
      <CreateBetForm />
    </Main>
  );
}
