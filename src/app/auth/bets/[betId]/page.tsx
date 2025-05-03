import { Chip } from '@/components/ui/Chip';
import { FormHeading } from '@/components/ui/FormHeading';
import { Helper } from '@/components/ui/InputHelper';
import { BetHeader } from '@/features/bets/components/BetHeader';
import { PlaceBidButton } from '@/features/bets/components/PlaceBidButton';
import { PoolDisplay } from '@/features/bets/components/PoolDisplay';
import { Bets } from '@/features/bets/DAL/Bets';
import { Check } from '@mui/icons-material';
import db from 'betting_app/dbconfig';

export default async function BetPage({ params }) {
  const { betId } = await params;
  const bet = await Bets.get({
    query: { 'bet.id': betId },
    select: ['bet.data', 'bet.expires_at', 'bet.id', 'bet.currency_id'],
    ctx: db,
  }).first();

  await Bets.joinBid(bet);
  const outcomes = await db('bets.outcome').where({ bet_id: betId }).select('id', 'label');

  return (
    <main className='flex flex-col w-full h-full'>
      <section className='flex flex-col gap-2 py-2 bg-accent text-white px-default'>
        <FormHeading>
          <span className='text-white'>{bet.data.title}</span>
        </FormHeading>
        <p className='mb-4 text-white'>{bet.data.description || 'No description.'}</p>
        <BetHeader bet={bet} />
      </section>

      <section className='flex w-full flex-1 items-center flex-col gap-2 justify-center py-2 px-default'>
        <PoolDisplay bet={bet} />
      </section>
      <section className='w-full flex justify-center py-2 px-default'>
        <div className='flex w-full flex-col gap-2'>
          {bet.bid === undefined ? (
            <PlaceBidButton
              disabled={
                bet.data.is_frozen ||
                bet.bid !== undefined ||
                (bet.expires_at && bet.expires_at.getTime() - Date.now() <= 0)
              }
              bet={bet}
              outcomes={outcomes}
            />
          ) : (
            <Chip icon={<Check sx={{ color: 'white', fontSize: '1rem' }} />}>
              {bet.bid.outcome}
            </Chip>
          )}
          <span className='w-full flex justify-center text-center'>
            {bet.data.is_frozen && (
              <Helper>The challenge has been frozen. You cannot participate at this time.</Helper>
            )}
          </span>
        </div>
      </section>
    </main>
  );
}
