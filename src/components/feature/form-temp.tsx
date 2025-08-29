import { createClassName } from '@/utils/create-class-name';

type FormProps = Omit<React.ComponentProps<'form'>, 'className'> & { centered?: boolean };

export function Form({ children, centered = false, ...props }: FormProps) {
  const className = createClassName(
    'flex flex-col gap-4 lg:w-[32%] xs:w-full',
    centered ? 'flex-1 justify-center h-full' : ''
  );
  return (
    <form
      {...props}
      className={className}>
      {children}
    </form>
  );
}
