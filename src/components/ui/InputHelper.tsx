const HelperBase = ({ children }) => <div className='text-sm'>{children}</div>;

export function ErrorHelper({ children }) {
  return (
    <span className='text-red-600'>
      <HelperBase>{children}</HelperBase>
    </span>
  );
}

export function SuccessHelper({ children }) {
  return (
    <span className='text-green-600'>
      <HelperBase>{children}</HelperBase>
    </span>
  );
}
