import React from 'react';

export function Container({ children, as, ...props }) {
  const element = React.createElement(
    as,
    {
      ...props,
      className:
        'flex flex-col xs:p-2 lg:p-4 gap-2 rounded-md border border-border w-full cursor-pointer hover:shadow-md text-black bg-white font-normal',
    },
    children
  );
  return element;
}
