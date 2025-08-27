import { createClassName } from '@/utils/createClassName';

const HelperBase = ({ children, variant = 'contained', color = null }) => {
  const className = createClassName(
    'notice',
    variant ? `${variant}` : '',
    color ? `--${color}` : ''
  );
  return <div className={className}>{children}</div>;
};

export function Helper({ children }) {
  return <HelperBase>{children}</HelperBase>;
}

export function ErrorHelper({ children }) {
  return (
    <HelperBase
      variant={'contained'}
      color='error'>
      {children}
    </HelperBase>
  );
}

export function SuccessHelper({ children }) {
  return <HelperBase color='success'>{children}</HelperBase>;
}
