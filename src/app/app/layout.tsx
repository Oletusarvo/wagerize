import { NotificationsProvider } from '@/features/notifications/providers/NotificationsProvider';
import { UserProvider } from '@/features/users/contexts/UserProvider';
import { tablenames } from '@/tablenames';
import { loadSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';

export default async function AppLayout({ children }) {
  const session = await loadSession();
  const user = await db(tablenames.user).where({ id: session.user.id }).first();
  const notifications = await db(tablenames.notification)
    .where({ user_id: session.user.id })
    .limit(10);

  return (
    <UserProvider initialUser={user}>
      <NotificationsProvider initialNotifications={notifications}>{children}</NotificationsProvider>
    </UserProvider>
  );
}
