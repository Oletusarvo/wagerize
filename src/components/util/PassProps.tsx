import React from 'react';

export function PassProps({ children, ...props }) {
  return React.Children.map(children, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
    })
  );
}
