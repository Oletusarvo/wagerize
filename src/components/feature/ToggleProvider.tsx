import { createContextWithHook } from '@/utils/createContextWithHook';
import { useState } from 'react';
import { PassProps } from '../util/PassProps';

type ToggleContextProps = {
  state: boolean;
  toggleState: (newState?: boolean) => void;
};

const [ToggleContext, useToggleContext] =
  createContextWithHook<ToggleContextProps>('ToggleContext');

export function ToggleProvider({ children }) {
  const [state, setState] = useState(false);
  const toggleState = (newState?: boolean) => setState(newState !== undefined ? newState : !state);
  return <ToggleContext.Provider value={{ state, toggleState }}>{children}</ToggleContext.Provider>;
}

ToggleProvider.Trigger = function ({ children }) {
  const { toggleState } = useToggleContext();
  return <PassProps onClick={() => toggleState}>{children}</PassProps>;
};

ToggleProvider.Target = function ({ children }) {
  const { state } = useToggleContext();
  return state ? children : null;
};
