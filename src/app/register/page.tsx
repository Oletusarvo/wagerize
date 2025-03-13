import { RegisterForm } from '@/features/users/register/components/RegisterForm';

export default async function Register() {
  return (
    <main className='lg:px-default xs:px-4 flex flex-col items-center xs:justify-start lg:justify-center gap-2 w-full flex-1 overflow-y-scroll py-4'>
      <RegisterForm />
    </main>
  );
}
