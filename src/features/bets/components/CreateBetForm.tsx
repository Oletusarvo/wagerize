'use client';

import { Form } from '@/components/feature/Form';
import { useCreateBetForm } from '../hooks/useCreateBetForm';
import { FormHeading } from '@/components/ui/FormHeading';
import { Button, LoaderButton } from '@/components/feature/Button';

import { useStep } from '@/hooks/useSteps';
import { StepTrack } from '@/components/StepTrack';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { TitleInput } from './CreateBetForm/inputs/TitleInput';
import { DescriptionInput } from './CreateBetForm/inputs/DescriptionInput';
import { MinBidInput } from './CreateBetForm/inputs/MinBidInput';
import { OutcomesInput } from './CreateBetForm/inputs/OutcomesInput';
import { ExpiryDateInput } from './CreateBetForm/inputs/ExpiryDateInput';
import { MinRaiseInput } from './CreateBetForm/inputs/MinRaiseInput';
import { MaxRaiseInput } from './CreateBetForm/inputs/MaxRaiseInput';
import { useRouter } from 'next/navigation';

const [CreateBetFormContext, useCreateBetFormContext] =
  createContextWithHook<ReturnType<typeof useCreateBetForm>>('CreateBetFormContext');

export { useCreateBetFormContext };

export function CreateBetForm() {
  const { current, forward, backward } = useStep();
  const router = useRouter();
  const hook = useCreateBetForm();
  const { onSubmit, status } = hook;

  const submitButton =
    current < 1 ? (
      <Button
        variant='contained'
        color='accent'
        onClick={() => forward()}
        type='button'
        fullWidth>
        Next
      </Button>
    ) : (
      <LoaderButton
        variant='contained'
        color='accent'
        type='submit'
        loading={status === 'loading'}
        disabled={status === 'loading' || status === 'success'}
        fullWidth>
        Submit
      </LoaderButton>
    );

  return (
    <CreateBetFormContext.Provider value={hook}>
      <form
        className='flex flex-col flex-1 w-full h-full gap-2'
        onSubmit={onSubmit}>
        <FormHeading>Create Challenge</FormHeading>
        <StepTrack
          currentStep={current}
          max={2}
        />
        {current === 0 ? <StepOne /> : <StepTwo />}

        <div className='w-full mt-auto flex gap-2'>
          <Button
            color='secondary'
            variant='outlined'
            fullWidth
            onClick={() => (current > 0 ? backward() : router.push('/app/feed'))}
            type='button'>
            {current === 0 ? 'Cancel' : 'Back'}
          </Button>
          {submitButton}
        </div>
      </form>
    </CreateBetFormContext.Provider>
  );
}

function StepOne() {
  return (
    <>
      <TitleInput />
      <ExpiryDateInput />
      <DescriptionInput />
    </>
  );
}

function StepTwo() {
  return (
    <>
      <MinBidInput />
      <MinRaiseInput />
      <MaxRaiseInput />
      <OutcomesInput />
    </>
  );
}
