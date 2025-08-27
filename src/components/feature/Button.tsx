import { withLoader } from '@/hoc/withLoader';
import { useClassName } from '@/hooks/useClassName';

type ButtonProps = React.ComponentProps<'button'> & {
  fullWidth?: boolean;
  round?: boolean;
  variant?: 'contained' | 'outlined' | 'ghost';
  color?: 'accent' | 'secondary';
};

export function Button({
  children,
  fullWidth = false,
  round = false,
  variant = 'contained',
  color = 'accent',
  ...props
}: ButtonProps) {
  const className = useClassName(
    fullWidth ? 'w-full' : 'w-auto',
    round ? '--round' : '',
    `${variant}`,
    `--${color}`,
    'button'
  );

  return (
    <button
      {...props}
      className={className}>
      {children}
    </button>
  );
}

export const LoaderButton = withLoader(Button);
