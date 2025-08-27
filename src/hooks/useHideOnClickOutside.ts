import { useEffect, useRef } from 'react';

export function useHideOnClickOutside(callback: (e) => void, enabled: boolean = true) {
  const ref = useRef<HTMLElement>(null);
  const handleClickOutside = e => {
    if (!ref.current) {
      return;
    }

    if (!ref.current.contains(e.target)) {
      callback(e);
    }
  };

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [enabled]);

  return ref;
}
