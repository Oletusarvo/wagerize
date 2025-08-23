import { socket } from '@/socket';
import { useEffect } from 'react';

const roomUsage = new Map();

export function useSocketRooms(roomNames: string[]) {
  useEffect(() => {
    for (const room of roomNames) {
      const usageCount = roomUsage.get(room) || 0;
      if (usageCount === 0) {
        socket.emit('join_room', room);
      }
      roomUsage.set(room, usageCount + 1);
    }

    return () => {
      for (const room of roomUsage.keys()) {
        const usageCount = roomUsage.get(room) - 1 || 0;
        roomUsage.set(room, usageCount);

        if (usageCount <= 0) {
          roomUsage.delete(room);
          socket.emit('leave_room', room);
        }
      }
    };
  }, [roomNames]);
}
