import { AppHeader } from '@/components/AppHeader';
import { NotificationsProvider } from '@/features/notifications/providers/NotificationsProvider';
import { UserProvider } from '@/features/users/contexts/UserProvider';
import { WalletBalanceDisplay } from '@/features/wallets/components/WalletBalanceDisplay';
import { getWallet } from '@/features/wallets/dal/getWallet';
import { WalletProvider } from '@/features/wallets/providers/WalletProvider';
import { tablenames } from '@/tablenames';
import { loadSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';

export default async function AppLayout({ children }) {
  const session = await loadSession();
  const initialWallet = await db(tablenames.wallet)
    .where({
      user_id: session.user.id,
      currency_id: db.select('id').from(tablenames.currency).where({ symbol: 'DICE' }).limit(1),
    })
    .first();

  return (
    <UserProvider initialUser={session.user}>
      <WalletProvider initialWallet={initialWallet}>
        <NotificationsProvider initialNotifications={[]}>
          <AppHeader></AppHeader>
          <WalletBalanceDisplay />
          {children}
        </NotificationsProvider>
      </WalletProvider>
    </UserProvider>
  );
}
