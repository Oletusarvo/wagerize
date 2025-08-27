import { useState } from 'react';

export function useStep(initialStep: number = 0, max: number = Infinity) {
  const [current, setCurrent] = useState(initialStep);
  const forward = () => {
    if (current < max) {
      setCurrent(prev => prev + 1);
      return true;
    }
    return false;
  };

  const backward = () => {
    if (current > 0) {
      setCurrent(prev => prev - 1);
      return true;
    }
    return false;
  };

  const reset = () => setCurrent(0);

  const set = (step: number) => {
    if (step > max || step < 0) {
      return false;
    }
    setCurrent(step);
    return true;
  };

  return { current, forward, backward, reset, set };
}
