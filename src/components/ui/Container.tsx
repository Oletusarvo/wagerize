import React from 'react';

export function Container({ children, as = 'div', ...props }: { [x: string]: any; as?: any }) {
  const className = [
    'rounded-md flex flex-col xs:p-4 lg:p-8 gap-2 w-full text-black bg-background-light font-normal',
  ].join(' ');

  const element = React.createElement(
    as,
    {
      ...props,
      className,
    },
    children
  );
  return element;
}
