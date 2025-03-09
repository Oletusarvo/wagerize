export function Header({ children, ref }: React.PropsWithChildren & { ref: any }) {
  return (
    <header
      className='lg:px-default xs:px-4 py-4 border-b border-slate-200 z-30 bg-white'
      ref={ref}>
      {children}
    </header>
  );
}
