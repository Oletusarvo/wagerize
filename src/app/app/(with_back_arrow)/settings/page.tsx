import { AccountSettingsForm } from '@/features/users/settings/components/AccountSettingsForm';

export default async function AccountSettingsPage() {
  return (
    <div className='flex w-full flex-1 flex-col gap-2 xs:px-4 lg:px-default py-4'>
      <AccountSettingsForm />
    </div>
  );
}
