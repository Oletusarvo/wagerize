'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { useEffect, useRef, useState } from 'react';
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
    const fn = setState;
    fn(newState !== undefined ? newState : !state);
  };

  useEffect(() => toggleState(initialState), [initialState]);
  useEffect(() => onChange && onChange(state), [state]);
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

ToggleProvider.Target = function ({ children, hideOnClickOutside = false }) {
  const { state, toggleState } = useToggleContext();
  const ref = useRef<HTMLElement | null>(null);

  const handleClickOutside = e => {
    if (hideOnClickOutside && ref.current && !ref.current.contains(e.target)) {
      console.log('Calling handleClickOutside');
      toggleState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return state ? (
    <PassProps
      ref={ref}
      onClick={handleClickOutside}>
      {children}
    </PassProps>
  ) : null;
};
