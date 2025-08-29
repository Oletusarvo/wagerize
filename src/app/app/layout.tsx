import { AppHeader } from '@/components/app-header';
import { NotificationsProvider } from '@/features/notifications/providers/notifications-provider';
import { UserProvider } from '@/features/users/contexts/user-provider';
import { WalletBalanceDisplay } from '@/features/wallets/components/wallet-balance-display';
import { getWallet } from '@/features/wallets/dal/get-wallet';
import { WalletProvider } from '@/features/wallets/providers/wallet-provider';
import { tablenames } from '@/tablenames';
import { loadSession } from '@/utils/load-session';
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
