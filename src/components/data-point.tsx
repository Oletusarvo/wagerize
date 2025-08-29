import React, { ReactNode } from 'react';
import { Icon } from './ui/icon-temp';

export function DataPoint({ IconComponent, content, color = 'accent' }: DataPointProps) {
  return (
    <div className='flex items-center text-sm gap-1'>
      <Icon
        Component={IconComponent}
        color={color}
        size='16px'
      />
      <span>{content}</span>
    </div>
  );
}

type DataPointProps = {
  IconComponent: React.FC<any>;
  content: ReactNode;
  color?: string;
};
