'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { useEffect, useId, useRef, useState } from 'react';
import { PassProps } from '../util/PassProps';

type ToggleContextProps = {
  state: boolean;
  toggleState: (newState?: boolean) => void;
  id: string;
};

const [ToggleContext, useToggleContext] =
  createContextWithHook<ToggleContextProps>('ToggleContext');

type ToggleProviderProps = React.PropsWithChildren & {
  onChange?: (state: boolean) => void;
  initialState?: boolean;
};

export function ToggleProvider({ children, onChange, initialState = false }: ToggleProviderProps) {
  const [state, setState] = useState(initialState);
  const id = useId();
  const toggleState = (newState?: boolean) => {
    const fn = setState;
    fn(newState !== undefined ? newState : !state);
  };

  useEffect(() => toggleState(initialState), [initialState]);
  useEffect(() => onChange && onChange(state), [state]);
  return (
    <ToggleContext.Provider value={{ state, toggleState, id: id.split(':').at(1) }}>
      {children}
    </ToggleContext.Provider>
  );
}

const triggerClassName = 'toggle-provider-trigger';
ToggleProvider.Trigger = function ({ children, ...props }) {
  const { toggleState, id } = useToggleContext();
  return (
    <PassProps
      {...props}
      className={`${triggerClassName}-${id}`}
      onClick={() => toggleState()}>
      {children}
    </PassProps>
  );
};

ToggleProvider.Target = function ({ children, hideOnClickOutside = false }) {
  const { state, toggleState, id: toggleProviderId } = useToggleContext();
  const ref = useRef<HTMLElement | null>(null);

  //Closes the target if clicking outside of it, and not clicking on any of its triggers.
  const handleClickOutside = e => {
    const safeId = toggleProviderId;
    const closestTrigger = e.target.closest(`.${triggerClassName}-${safeId}`);
    if (
      hideOnClickOutside &&
      ref.current &&
      //The click happens outside the target
      !ref.current.contains(e.target) &&
      //The click does not happen on any of the triggers
      closestTrigger === null
    ) {
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
