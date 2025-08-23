'use client';

import { useUserContext } from '@/features/users/contexts/UserProvider';
import { useSocketHandlers } from '@/hooks/useSocketHandlers';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { useState } from 'react';

const [NotificationsContext, useNotificationsContext] = createContextWithHook<{
  notifications: any[];
}>('NotificationsContext');

type NotificationsProviderProps = React.PropsWithChildren & {
  initialNotifications: any[];
};
export function NotificationsProvider({
  children,
  initialNotifications,
}: NotificationsProviderProps) {
  const { user } = useUserContext();
  const [notifications, setNotifications] = useState(initialNotifications);

  useSocketHandlers({
    'notification:new': payload => {
      if (payload.user_id !== user.id) return;
      setNotifications(prev => [payload, ...prev]);
    },
  });

  return (
    <NotificationsContext.Provider value={{ notifications }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export { useNotificationsContext };
