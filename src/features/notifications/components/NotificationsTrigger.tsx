'use client';

import { Button } from '@/components/feature/Button';
import { ToggleProvider } from '@/providers/ToggleProvider';
import { Bell } from 'lucide-react';
import { NotificationsModal } from './NotificationsModal';
import { useNotificationsContext } from '../providers/NotificationsProvider';

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
