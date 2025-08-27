'use client';

import { Modal } from '@/components/ui/Modal';
import { useNotificationsContext } from '../providers/NotificationsProvider';

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
