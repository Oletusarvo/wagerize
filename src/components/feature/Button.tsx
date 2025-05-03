import { useMemo } from 'react';
import { Spinner } from '../ui/Spinner';

type ButtonProps = React.ComponentProps<'button'> & {
  loading?: boolean;
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined';
  color?: 'accent';
};

export function Button({
  children,
  loading = false,
  fullWidth = false,
  variant = 'contained',
  color = 'accent',
  ...props
}: ButtonProps) {
  const className = useMemo(() => {
    return [props.className, fullWidth ? 'w-full' : 'w-auto', `${variant}`, `--${color}`, 'button']
      .join(' ')
      .trim();
  }, [variant, color, fullWidth, props.className]);

  return (
    <button
      {...props}
      className={className}>
      {loading ? <Spinner /> : children}
    </button>
  );
}
