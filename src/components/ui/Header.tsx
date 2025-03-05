export function Header({ children }) {
  return (
    <header className='lg:px-default xs:px-4 py-4 border-b border-slate-200 z-20 bg-white'>
      {children}
    </header>
  );
}
