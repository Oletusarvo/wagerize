import { Container } from '@/components/ui/Container';
import { FormHeading } from '@/components/ui/FormHeading';
import { Main } from '@/components/ui/Main';
import { ManageBetButton } from '@/features/bets/components/ManageBetModal';
import { Bets } from '@/features/bets/DAL/Bets';
import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';

export default async function ManageBetsPage() {
  const session = await getSession();
  const bets = await Bets.get({
    query: { author_id: session.user.id },
    select: ['bet.id', 'data', 'expires_at'],
    ctx: db,
  })
    //Only show bets that have expired, or have no expiry date.
    .andWhere(
      db.raw('CASE WHEN expires_at IS NOT NULL THEN expires_at <= CURRENT_TIMESTAMP ELSE TRUE END')
    )
    .orderBy('expires_at', 'desc');

  await Promise.all(bets.map(async b => Bets.joinOutcomes(b)));
  console.log(bets);
  return (
    <Main>
      <div className='flex flex-col gap-2 w-full'>
        <FormHeading>Your bets</FormHeading>
        <p className='mb-4'>
          In this section, you will find the bets you have created, that have expired, or do not
          have an expiry date.
          <br />
          Bets still in progress will not be shown.
        </p>
        {bets.map((b, i) => (
          <Listing
            key={`m-b-${i}`}
            bet={b}
          />
        ))}
      </div>
    </Main>
  );
}

const Listing = ({ bet }) => {
  return (
    <Container as='div'>
      <div className='flex w-full justify-between items-center'>
        <h1>{bet.data.title}</h1>
        <ManageBetButton
          betId={bet.id}
          outcomes={bet.outcomes}
        />
      </div>
    </Container>
  );
};
