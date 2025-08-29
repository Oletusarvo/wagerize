import { ReactElement, ReactNode } from 'react';

export function withAlternate<PropsT extends React.PropsWithChildren>(
  Component: React.FC<PropsT>,
  replace?: boolean
) {
  return ({
    children,
    showAlternate,
    alternate,
    ...props
  }: PropsT & {
    showAlternate?: boolean;
    alternate?: ReactNode;
  }) => {
    if (showAlternate) {
      if (replace) {
        return alternate;
      } else {
        return <Component {...(props as PropsT)}>{alternate}</Component>;
      }
    } else {
      return <Component {...(props as PropsT)}>{children}</Component>;
    }
  };
}
