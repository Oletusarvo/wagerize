export function Header({ children, ref }: React.PropsWithChildren & { ref: any }) {
  return (
    <header
      className='px-default py-2 border-b border-border z-30 bg-background-light'
      ref={ref}>
      {children}
    </header>
  );
}
