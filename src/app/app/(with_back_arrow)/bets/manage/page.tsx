import { Container } from '@/components/ui/Container';
import { FormHeading } from '@/components/ui/FormHeading';
import { Main } from '@/components/ui/Main';
import { ManageBetButton } from '@/features/bets/components/ManageBetModal';
import { Bets } from '@/features/bets/DAL/Bets';
import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import Link from 'next/link';

export default async function ManageBetsPage() {
  const session = await getSession();
  const bets = await Bets.get({
    query: { author_id: session.user.id },
    select: ['bet.id', 'data', 'expires_at'],
    ctx: db,
  }).orderBy('expires_at', 'desc');

  await Promise.all(bets.map(async b => Bets.joinOutcomes(b)));

  const expired = bets.filter(
    b => b.expires_at === null || (b.expires_at && b.expires_at.getTime() - Date.now() <= 0)
  );
  const rest = bets.filter(b => !expired.includes(b));

  return (
    <div className='py-4 px-default'>
      <div className='flex flex-col gap-4 w-full'>
        <FormHeading>Your challenges</FormHeading>

        {expired.length > 0 ? (
          <div className='flex flex-col gap-2'>
            <h2 className='font-semibold'>Expired, or closeable</h2>
            {expired.map((b, i) => (
              <Listing
                key={`m-b-${i}`}
                bet={b}
                expired
              />
            ))}
          </div>
        ) : null}
        {rest.length > 0 ? (
          <div className='flex flex-col gap-2'>
            <h2 className='font-semibold'>In progress</h2>
            {rest.map((b, i) => (
              <Listing
                key={`m-b-${i}`}
                bet={b}
                expired={false}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const Listing = ({ bet, expired }) => {
  return (
    <Container>
      <div className='flex w-full justify-between items-center h-[60px]'>
        <h2 className='text-nowrap overflow-hidden text-ellipsis w-[90%] font-semibold text-accent'>
          {bet.data.title}
        </h2>

        <ManageBetButton
          bet={bet}
          outcomes={bet.outcomes}
        />
      </div>
    </Container>
  );
};
