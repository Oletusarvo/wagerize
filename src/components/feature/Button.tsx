import { useMemo } from 'react';
import { Spinner } from '../ui/Spinner';

type ButtonProps = Omit<React.ComponentProps<'button'>, 'className'> & {
  loading?: boolean;
  fullWidth?: boolean;
  variant?: 'contained';
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
    return [
      'flex px-4 py-2 uppercase justify-center min-h-[2.5rem] items-center',
      fullWidth ? 'w-full' : 'w-auto',
      variant === 'contained'
        ? ['text-white', color === 'accent' ? 'bg-accent' : 'bg-none'].join(' ')
        : variant === 'outlined'
        ? [
            'border',
            color === 'accent' ? 'border-accent text-accent' : 'border-slate-200 text-slate-500',
          ].join(' ')
        : '',
    ]
      .join(' ')
      .trim();
  }, [variant, color, fullWidth]);

  return (
    <button
      {...props}
      className={className}>
      {loading ? <Spinner /> : children}
    </button>
  );
}
