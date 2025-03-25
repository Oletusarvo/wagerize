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
    return [
      props.className,
      'flex px-4 py-2 uppercase justify-center min-h-[2.5rem] items-center font-semibold',
      fullWidth ? 'w-full' : 'w-auto',
      variant === 'contained'
        ? [
            'text-white',
            color === 'accent'
              ? 'bg-accent hover:bg-accent-light disabled:bg-accent-disabled'
              : 'bg-none',
          ].join(' ')
        : variant === 'outlined'
        ? [
            'border',
            color === 'accent' ? 'border-accent text-accent' : 'border-slate-200 text-slate-500',
          ].join(' ')
        : '',
    ]
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
