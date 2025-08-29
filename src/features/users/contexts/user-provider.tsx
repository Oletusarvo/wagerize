'use client';

import { createContextWithHook } from '@/utils/create-context-with-hook';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const [UserContext, useUserContext] = createContextWithHook<{
  user: any;
  status: ReturnType<typeof useSession>['status'];
  updateSession: ReturnType<typeof useSession>['update'];
}>('UserContext');

type UserProviderProps = React.PropsWithChildren & {
  initialUser: any;
};

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState(initialUser);
  const { status, update: updateSession } = useSession();
  return (
    <UserContext.Provider value={{ user, status, updateSession }}>{children}</UserContext.Provider>
  );
}

export { useUserContext };
