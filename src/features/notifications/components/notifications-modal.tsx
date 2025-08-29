'use client';

import { Modal } from '@/components/ui/modal';
import { useNotificationsContext } from '../providers/notifications-provider';

export function NotificationsModal(props) {
  const { notifications, toggleNotificationsModal } = useNotificationsContext();
  return (
    <Modal
      {...props}
      fullHeight
      title='Notifications'
      onClose={() => toggleNotificationsModal(false)}></Modal>
  );
}
