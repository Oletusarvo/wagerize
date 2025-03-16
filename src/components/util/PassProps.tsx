import React from 'react';

export function PassProps({ children, ...props }) {
  return React.Children.map(children, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
      onClick: e => {
        child.props.onClick && child.props.onClick(e);
        props.onClick && props.onClick(e);
      },
      className: [child.props.className, props.className].join(' ').trim(),
    })
  );
}
