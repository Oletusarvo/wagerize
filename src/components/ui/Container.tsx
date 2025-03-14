import React from 'react';

export function Container({ children, as = 'div', ...props }: { [x: string]: any; as?: any }) {
  const className = [
    'border border-border rounded-md flex flex-col xs:p-2 lg:p-4 gap-2 w-full cursor-pointer hover:shadow-md text-black bg-white font-normal',
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
