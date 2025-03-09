'use client';

import { useEffect } from 'react';

export function UserAgentDetector() {
  useEffect(() => {
    if (typeof window !== undefined && window.innerWidth > 768) {
      // Or show a message:
      throw new Error('This web app is only available on mobile devices!');
    }
  }, [window.innerWidth]);
  return null;
}
