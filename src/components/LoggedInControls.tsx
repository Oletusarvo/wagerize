import { NotificationsTrigger } from '@/features/notifications/components/NotificationsTrigger';
import { WalletsModalTrigger } from '@/features/wallets/components/WalletsModalTrigger';

export function LoggedInControls() {
  return (
    <>
      <WalletsModalTrigger />
      <NotificationsTrigger />
    </>
  );
}
