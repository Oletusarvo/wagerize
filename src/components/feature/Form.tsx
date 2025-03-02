type FormProps = Omit<React.ComponentProps<'form'>, 'className'>;

export function Form({ children, ...props }: FormProps) {
  return (
    <form
      {...props}
      className='flex flex-col gap-8 lg:w-[32%] xs:w-full'>
      {children}
    </form>
  );
}
