export function Icon({ Component, size = 'default', ...props }: IconProps) {
  const fontSize = size === 'default' ? '1rem' : '1.5rem';
  return (
    <Component
      {...props}
      sx={{ color: 'var(--color-accent)', fontSize }}
    />
  );
}

type IconProps = {
  [x: string]: any;
  Component: React.FC<any>;
  size?: 'default' | 'large';
};
