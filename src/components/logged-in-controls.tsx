import { NotificationsTrigger } from '@/features/notifications/components/notifications-trigger';
import { WalletsModalTrigger } from '@/features/wallets/components/wallets-modal-trigger';

export function LoggedInControls() {
  return (
    <>
      <WalletsModalTrigger />
      <NotificationsTrigger />
    </>
  );
}
