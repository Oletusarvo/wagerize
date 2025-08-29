import { createClassName } from '@/utils/create-class-name';

export function StepTrack({ currentStep, max }) {
  const generatePips = () => {
    const pips = [];
    for (let i = 0; i < max; ++i) {
      const pipClassName = createClassName(
        i <= currentStep ? 'bg-accent' : 'bg-background-light',
        'h-1 w-full absolute'
      );

      const blurClassName = createClassName(pipClassName, 'blur-xs');

      pips.push(
        <div
          className='relative flex items-center justify-center w-full'
          key={`step-track-slot-${i}`}>
          {i <= currentStep ? <div className={blurClassName} /> : null}
          <div className={pipClassName}></div>
        </div>
      );
    }
    return pips;
  };

  if (max == Infinity) {
    return null;
  } else {
    return <div className='flex gap-1 w-full'>{generatePips()}</div>;
  }
}
