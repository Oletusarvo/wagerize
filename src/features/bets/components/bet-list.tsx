import { BetListing } from './bet-listing';
import { TBet } from '../schemas/bet-schema';
import { BetProvider } from '../providers/bet-provider';
import { List } from '@/components/feature/list-temp';
import { loadSession } from '@/utils/load-session';
import db from 'betting_app/dbconfig';
import { tablenames } from '@/tablenames';
import { BidProvider } from '@/features/bids/providers/bid-provider';
import { getBid } from '@/features/bids/dal/get-bid';

type BetListProps = {
  bets: TBet[];
};

export async function BetList({ bets }: BetListProps) {
  const session = await loadSession();

  return (
    <div className='flex flex-col gap-2 w-full'>
      <List<TBet>
        data={bets}
        component={async ({ item }) => {
          const bid = await getBid(db).where({ bet_id: item.id, user_id: session.user.id }).first();

          return (
            <BetProvider initialBet={item}>
              <BidProvider initialBid={bid}>
                <BetListing />
              </BidProvider>
            </BetProvider>
          );
        }}
      />
    </div>
  );
}
