'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { useEffect, useId, useRef, useState } from 'react';
import { PassProps } from '../components/util/PassProps';
import { useHideOnClickOutside } from '@/hooks/useHideOnClickOutside';

type ToggleContextProps = {
  state: boolean;
  toggleState: (newState?: boolean) => void;
  hideOnClickOutside?: boolean;
  triggerRef: React.RefObject<HTMLElement>;
};

const [ToggleContext, useToggleContext] =
  createContextWithHook<ToggleContextProps>('ToggleContext');

type ToggleProviderProps = React.PropsWithChildren & {
  onChange?: (state: boolean) => void;
  initialState?: boolean;
};

export function ToggleProvider({ children, onChange, initialState = false }: ToggleProviderProps) {
  const triggerRef = useRef<HTMLElement>(null);

  const [state, setState] = useState(initialState);
  const toggleState = (newState?: boolean) => {
    const fn = setState;
    fn(newState !== undefined ? newState : !state);
  };

  useEffect(() => toggleState(initialState), [initialState]);
  useEffect(() => onChange && onChange(state), [state]);
  return (
    <ToggleContext.Provider value={{ state, toggleState, triggerRef }}>
      {children}
    </ToggleContext.Provider>
  );
}

ToggleProvider.Trigger = function ({ children, action = null, ...props }) {
  const { toggleState, triggerRef } = useToggleContext();
  return (
    <PassProps
      {...props}
      ref={triggerRef}
      onClick={async e => {
        if (action) {
          try {
            await action();
          } catch {
            return;
          }
        }
        toggleState();
      }}>
      {children}
    </PassProps>
  );
};

ToggleProvider.Target = function ({ children, hideOnClickOutside = false }) {
  const { state, toggleState, triggerRef } = useToggleContext();
  const ref = useHideOnClickOutside(e => {
    //Do not hide if currently clicking on the trigger; the trigger will take care of it.
    if (!triggerRef.current.contains(e.target)) {
      toggleState(false);
    }
  }, hideOnClickOutside);
  return state ? <PassProps ref={ref}>{children}</PassProps> : null;
};
