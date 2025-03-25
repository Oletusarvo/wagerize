'use client';

import { useSearch } from '@/hooks/useSearch';

type PaginatorProps = {
  currentPage: number;
  numPages: number;
  paramName: string;
};
export function Paginator({ currentPage, numPages, paramName }: PaginatorProps) {
  const [updateSearch] = useSearch(paramName);

  return (
    <div className='flex gap-4 w-full justify-end'>
      {currentPage > 0 && (
        <Button
          disabled={currentPage == 0}
          onClick={() => {
            updateSearch(currentPage - 1);
          }}>
          Previous
        </Button>
      )}

      {numPages > 1 && (
        <Button
          disabled={currentPage >= numPages}
          onClick={() => {
            console.log('Disabled: ', currentPage >= numPages);
            updateSearch(currentPage + 1);
          }}>
          Next
        </Button>
      )}
    </div>
  );
}

const Button = ({ children, disabled = false, onClick, ...props }) => {
  const className = [
    'font-semibold text-gray-500 cursor-pointer',
    disabled ? 'text-gray-100' : 'text-gray-500',
  ]
    .join(' ')
    .trim();

  return (
    <span
      {...props}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      className={className}>
      {children}
    </span>
  );
};
