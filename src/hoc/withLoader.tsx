import { Spinner } from '@/components/ui/Spinner';
import { withAlternate } from './withAlternate';

export function withLoader<PropsT extends React.PropsWithChildren>(Component: React.FC<PropsT>) {
  return ({ children, loading, ...props }: PropsT & { loading?: boolean }) => {
    const Enhanced = withAlternate(Component, false);
    return (
      <Enhanced
        {...(props as PropsT)}
        alternate={<Spinner />}
        showAlternate={loading}>
        {children}
      </Enhanced>
    );
  };
}
