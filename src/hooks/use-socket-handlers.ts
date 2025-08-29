import { socket } from '@/socket';
import { useEffect } from 'react';

export function useSocketHandlers(handlers: { [key: string]: (...args: any) => void }) {
  useEffect(() => {
    for (const [key, handler] of Object.entries(handlers)) {
      socket.on(key, handler);
    }

    return () => {
      for (const [key, handler] of Object.entries(handlers)) {
        socket.off(key, handler);
      }
    };
  }, [handlers]);
}
