'use client';
import { useCreateBetForm } from '../hooks/use-create-bet-form';
import { FormHeading } from '@/components/ui/form-heading';
import { Button, LoaderButton } from '@/components/feature/button-temp';

import { useStep } from '@/hooks/use-steps';
import { StepTrack } from '@/components/step-track';
import { createContextWithHook } from '@/utils/create-context-with-hook';
import { TitleInput } from './create-bet-form/inputs/title-input';
import { DescriptionInput } from './create-bet-form/inputs/description-input';
import { MinBidInput } from './create-bet-form/inputs/min-bid-input';
import { OutcomesInput } from './create-bet-form/inputs/outcomes-input';
import { ExpiryDateInput } from './create-bet-form/inputs/expiry-date-input';
import { MinRaiseInput } from './create-bet-form/inputs/min-raise-input';
import { MaxRaiseInput } from './create-bet-form/inputs/max-raise-input';
import { useRouter } from 'next/navigation';

const [CreateBetFormContext, useCreateBetFormContext] =
  createContextWithHook<ReturnType<typeof useCreateBetForm>>('CreateBetFormContext');

export { useCreateBetFormContext };

export function CreateBetForm() {
  const { current, forward, backward } = useStep();
  const router = useRouter();
  const hook = useCreateBetForm();
  const { onSubmit, status, parseResult } = hook;
  console.log(parseResult);
  const submitButton =
    current < 1 ? (
      <Button
        disabled={parseResult.title !== null || parseResult.description !== null}
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
