'use client';

import { useUserContext } from '@/features/users/contexts/UserProvider';
import { useSocketHandlers } from '@/hooks/useSocketHandlers';
import { ToggleProvider } from '@/providers/ToggleProvider';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { useState } from 'react';
import { NotificationsModal } from '../components/NotificationsModal';

const [NotificationsContext, useNotificationsContext] = createContextWithHook<{
  notifications: any[];
  toggleNotificationsModal: (state: boolean) => void;
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
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotificationsModal = (state: boolean) => setShowNotifications(state);
  useSocketHandlers({
    'notification:new': payload => {
      if (payload.user_id !== user.id) return;
      setNotifications(prev => [payload, ...prev]);
    },
  });

  return (
    <NotificationsContext.Provider value={{ notifications, toggleNotificationsModal }}>
      <ToggleProvider
        initialState={showNotifications}
        onChange={state => setShowNotifications(state)}>
        {children}
        <ToggleProvider.Target>
          <NotificationsModal />
        </ToggleProvider.Target>
      </ToggleProvider>
    </NotificationsContext.Provider>
  );
}

export { useNotificationsContext };
