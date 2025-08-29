'use client';

import { Button } from '@/components/feature/button-temp';
import { ToggleProvider } from '@/providers/toggle-provider';
import { Bell } from 'lucide-react';
import { NotificationsModal } from './notifications-modal';
import { useNotificationsContext } from '../providers/notifications-provider';

export function NotificationsTrigger() {
  const { toggleNotificationsModal } = useNotificationsContext();
  return (
    <Button
      onClick={() => toggleNotificationsModal(true)}
      variant='ghost'
      round>
      <Bell
        color='white'
        size='18px'
      />
    </Button>
  );
}
