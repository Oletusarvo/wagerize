export function Icon({ Component, size = 'default', color = 'accent', ...props }: IconProps) {
  const fontSize = size === 'default' ? '1rem' : '1.5rem';
  const c = color === 'accent' ? 'var(--color-accent)' : 'white';

  return (
    <Component
      {...props}
      sx={{ color: c, fontSize }}
    />
  );
}

type IconProps = {
  [x: string]: any;
  Component: React.FC<any>;
  size?: 'default' | 'large';
};
