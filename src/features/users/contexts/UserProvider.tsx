'use client';

import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext<any>(null);

function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<any>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session.user) {
      setUser(session.user);
    }
  }, [status]);

  return <UserContext.Provider value={{ user, status }}>{children}</UserContext.Provider>;
}

function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUserCOntext can only be used within the scope of a UserContext!');
  }
  return ctx;
}

export { UserProvider, useUserContext };
