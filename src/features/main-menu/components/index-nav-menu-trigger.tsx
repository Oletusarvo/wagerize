'use client';

import { Menu, X } from 'lucide-react';
import { ToggleProvider } from '../../../providers/toggle-provider';
import { Button } from '../../../components/feature/button';
import { useMainMenuContext } from '../providers/main-menu-provider';

export function IndexNavMenuTrigger() {
  const { mainMenuOpen } = useMainMenuContext();

  return (
    <div className='lg:hidden xs:block'>
      <ToggleProvider.Trigger>
        <Button
          variant='ghost'
          round>
          {mainMenuOpen ? <X color='white' /> : <Menu color='white' />}
        </Button>
      </ToggleProvider.Trigger>
    </div>
  );
}
