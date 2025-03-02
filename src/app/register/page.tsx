import { Main } from '@/components/ui/Main';
import { RegisterForm } from '@/features/users/register/components/RegisterForm';

export default async function Register() {
  return (
    <Main centered>
      <RegisterForm />
    </Main>
  );
}
