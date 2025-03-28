import React, { ReactNode } from 'react';
import { Icon } from './ui/Icon';

export function DataPoint({ IconComponent, content, color = 'accent' }: DataPointProps) {
  return (
    <div className='flex items-center text-base gap-1'>
      <Icon
        Component={IconComponent}
        color={color}
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
