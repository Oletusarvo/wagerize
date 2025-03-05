'use client';

import { useSession } from 'next-auth/react';
import { createContext, useContext } from 'react';

const UserContext = createContext<any>(null);

function UserProvider({ children }: React.PropsWithChildren) {
  const { data: session, status, update: updateSession } = useSession();
  return (
    <UserContext.Provider value={{ user: session?.user, status, updateSession }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUserContext can only be used within the scope of a UserContext!');
  }
  return ctx;
}

export { UserProvider, useUserContext };
