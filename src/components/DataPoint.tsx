import React, { ReactNode } from 'react';
import { Icon } from './ui/Icon';

export function DataPoint({ IconComponent, content }: DataPointProps) {
  return (
    <div className='flex items-center text-base gap-1'>
      <Icon Component={IconComponent} />
      <span>{content}</span>
    </div>
  );
}

type DataPointProps = {
  IconComponent: React.FC<any>;
  content: ReactNode;
};
