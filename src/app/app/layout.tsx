import { AppHeader } from '@/components/AppHeader';
import { MainMenuProvider } from '@/features/mainMenu/providers/MainMenuProvider';
import { NotificationsProvider } from '@/features/notifications/providers/NotificationsProvider';
import { UserProvider } from '@/features/users/contexts/UserProvider';
import { WalletProvider } from '@/features/wallets/providers/WalletProvider';
import { loadSession } from '@/utils/getSession';

export default async function AppLayout({ children }) {
  const session = await loadSession();

  return (
    <UserProvider initialUser={session.user}>
      <NotificationsProvider initialNotifications={[]}>
        <WalletProvider initialWallet={{} as any}>
          <AppHeader />
          {children}
        </WalletProvider>
      </NotificationsProvider>
    </UserProvider>
  );
}
