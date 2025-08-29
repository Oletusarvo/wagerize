import { RegisterForm } from '@/features/register/components/register-form';

export default async function Register() {
  return (
    <div className='flex flex-col items-center xs:justify-start lg:justify-center gap-2 w-full py-4 px-default flex-1'>
      <RegisterForm />
    </div>
  );
}
