import { BetListing } from './BetListing';
import { TBet } from '../schemas/betSchema';
import { BetProvider } from '../providers/BetProvider';
import { List } from '@/components/feature/List';
import { loadSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import { tablenames } from '@/tablenames';
import { BidProvider } from '@/features/bids/providers/BidProvider';
import { getBid } from '@/features/bids/dal/getBid';

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
