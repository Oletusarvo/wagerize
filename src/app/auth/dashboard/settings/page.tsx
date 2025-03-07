import { AccountSettingsForm } from '@/features/users/settings/components/AccountSettingsForm';

export default async function AccountSettingsPage() {
  return (
    <main className='flex w-full flex-1 flex-col gap-2 xs:px-4 lg:px-default'>
      <AccountSettingsForm />
    </main>
  );
}
