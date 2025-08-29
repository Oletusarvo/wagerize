import React from 'react';
import { ReactNode } from 'react';

type DieProps = {
  numPips?: number;
};

export function Die({ numPips }: DieProps) {
  let pips: ReactNode[] = [];
  for (let i = 0; i < numPips; ++i) {
    const className = [
      'rounded-full w-[5px] h-[5px] bg-black',
      numPips == 4
        ? 'nth-2:justify-self-end nth-4:justify-self-end'
        : numPips === 5
        ? 'nth-2:justify-self-end nth-3:col-span-2 nth-3:justify-self-center nth-5:justify-self-end'
        : numPips === 6
        ? 'nth-2:justify-self-end nth-4:justify-self-end nth-6:justify-self-end'
        : '',
    ]
      .join(' ')
      .trim();

    pips.push(
      <div
        className={className}
        key={`pip-${i}`}
      />
    );
  }

  return (
    <div className='rounded-md bg-accent flex items-center justify-center w-8 h-8 p-1'>
      <PipContainer>{pips}</PipContainer>
    </div>
  );
}

function PipContainer({ children }) {
  const pipCount = React.Children.count(children);
  const className = [
    'flex w-full',
    pipCount === 2 || pipCount === 3
      ? 'justify-between rotate-[45deg]'
      : pipCount === 4
      ? 'grid grid-cols-2 grid-rows-2 h-full justify-between items-center px-[2px]'
      : pipCount === 5
      ? 'grid grid-cols-2 grid-rows-3 h-full justify-between items-center p-[2px]'
      : pipCount === 6
      ? 'grid grid-cols-2 grid-rows-3 h-full justify-between items-center px-[2px]'
      : 'justify-center',
  ]
    .join(' ')
    .trim();

  return <div className={className}>{children}</div>;
}
