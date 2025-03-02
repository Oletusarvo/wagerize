import { Main } from '@/components/ui/Main';
import { LoginForm } from '@/features/users/login/components/LoginForm';

export default async function Login() {
  return (
    <Main centered>
      <LoginForm />
    </Main>
  );
}
