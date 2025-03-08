import { ReactNode, useState } from 'react';
import { ToggleProvider } from './ToggleProvider';
import { ArrowDropDown } from '@mui/icons-material';

export function Drawer({ children, title }: DrawerProps) {
  return (
    <ToggleProvider>
      <div className='flex flex-col w-full'>
        <ToggleProvider.Trigger>
          <div className='p-4 w-full bg-white flex items-center justify-between cursor-pointer'>
            <h1>{title}</h1>
          </div>
        </ToggleProvider.Trigger>
        <ToggleProvider.Target>{children}</ToggleProvider.Target>
      </div>
    </ToggleProvider>
  );
}

Drawer.Body = function ({ children }) {
  return <div className='bg-white p-4 border-t border-border'>{children}</div>;
};

type DrawerProps = React.PropsWithChildren & {
  title: ReactNode;
};
