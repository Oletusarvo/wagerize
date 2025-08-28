'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { BetType } from '../types/BetType';
import { SetStateAction, useState } from 'react';
import { useSocketRooms } from '@/hooks/useSocketRooms';
import { useSocketHandlers } from '@/hooks/useSocketHandlers';
import { TBet } from '../schemas/betSchema';
import { updateBetAction } from '../actions/updateBetAction';
import { createFormData } from '@/utils/createFormData';
import { endBetAction } from '../actions/endBetAction';
import { ToggleProvider } from '@/providers/ToggleProvider';
import { EndBetModal } from '../components/EndBetModal';

const [BetContext, useBetContext] = createContextWithHook<{
  bet: TBet;
  isExpired: boolean;
  isFrozen: boolean;
  isPending: boolean;
  freeze: () => Promise<void>;
  activate: () => Promise<void>;
  end: (outcomeId: string) => Promise<void>;
  showEndBetModal: boolean;
  setShowEndBetModal: React.Dispatch<SetStateAction<boolean>>;
}>('BetContext');

type BetProviderProps = React.PropsWithChildren & {
  initialBet: TBet;
};

export function BetProvider({ children, initialBet }: BetProviderProps) {
  const [bet, setBet] = useState(initialBet);
  const [showEndBetModal, setShowEndBetModal] = useState(false);
  const isExpired = bet.expires_at ? Date.now() >= new Date(bet.expires_at).getTime() : false;
  const isFrozen = bet.status === 'frozen';
  const isPending = bet.status === 'pending';

  const freeze = async () => {
    await updateBetAction(
      createFormData({
        id: bet.id,
        status: 'frozen',
      })
    );
  };

  const activate = async () => {
    await updateBetAction(
      createFormData({
        id: bet.id,
        status: 'active',
      })
    );
  };

  const end = async (outcomeId: string) => {
    await endBetAction(bet.id, outcomeId);
  };

  useSocketRooms([`bet:${bet.id}`]);
  useSocketHandlers({
    'bet:update': payload => {
      if (payload.id !== bet.id) return;

      setBet(prev => ({
        ...prev,
        //The pool and min_bid will not update if receiving 0. Probably never going to happen, but keep this in mind if at some point doing it intentionally.
        pool: payload.pool || bet.pool,
        min_bid: payload.min_bid || bet.min_bid,
        status: payload.status || bet.status,
      }));
    },
  });
  return (
    <BetContext.Provider
      value={{
        bet,
        isExpired,
        isFrozen,
        isPending,
        showEndBetModal,
        setShowEndBetModal,
        freeze,
        activate,
        end,
      }}>
      <ToggleProvider
        initialState={showEndBetModal}
        onChange={state => setShowEndBetModal(state)}>
        {children}
        <ToggleProvider.Target>
          <EndBetModal />
        </ToggleProvider.Target>
      </ToggleProvider>
    </BetContext.Provider>
  );
}

export { useBetContext };
