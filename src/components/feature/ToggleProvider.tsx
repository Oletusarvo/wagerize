'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { useEffect, useState } from 'react';
import { PassProps } from '../util/PassProps';

type ToggleContextProps = {
  state: boolean;
  toggleState: (newState?: boolean) => void;
};

const [ToggleContext, useToggleContext] =
  createContextWithHook<ToggleContextProps>('ToggleContext');

type ToggleProviderProps = React.PropsWithChildren & {
  onChange?: (state: boolean) => void;
  initialState?: boolean;
};

export function ToggleProvider({ children, onChange, initialState = false }: ToggleProviderProps) {
  const [state, setState] = useState(initialState);

  const toggleState = (newState?: boolean) => {
    const fn = onChange || setState;
    fn(newState !== undefined ? newState : !state);
  };

  useEffect(() => toggleState(initialState), [initialState]);

  return <ToggleContext.Provider value={{ state, toggleState }}>{children}</ToggleContext.Provider>;
}

ToggleProvider.Trigger = function ({ children, ...props }) {
  const { toggleState } = useToggleContext();
  return (
    <PassProps
      {...props}
      onClick={() => toggleState()}>
      {children}
    </PassProps>
  );
};

ToggleProvider.Target = function ({ children }) {
  const { state } = useToggleContext();
  return state ? children : null;
};
