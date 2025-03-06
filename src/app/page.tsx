import { Button } from '@/components/feature/Button';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className='lg:px-default xs:px-4 py-8 flex flex-col flex-1 text-accent gap-16 overflow-y-scroll'>
      <section className='flex flex-col gap-4'>
        <Heading>Wagerize - A poker inspired betting app.</Heading>
        <p>
          Welcome to Wagerize — where the fun never stops and the bets are always on! Whether it’s
          guessing how many people will show up at an event or making predictions about anything you
          can think of, you can create your own bets and challenge others to join in. Bets are
          placed using "Dice," our quirky virtual currency, and the best part? It’s totally free to
          play! So, get your friends together, throw down some fun challenges, and see who’s got the
          best instincts.
        </p>
        <div className='xs:w-full lg:w-[25%]'>
          <Link href='/register'>
            <Button
              fullWidth
              type='button'
              color='accent'>
              Start Today
            </Button>
          </Link>
        </div>
      </section>

      <section className='flex flex-col gap-4'>
        <Heading>Features</Heading>
        <ul className='grid grid-cols-1 gap-2'>
          <Container as='li'>
            <div className='flex flex-col gap-2 text-accent'>
              <h1 className='font-semibold'>Virtual Currency</h1>
              <p>
                Place your bets with <strong>Dice</strong>—our quirky virtual currency that lets you
                join in on any bet! There’s no limit to how many bets you can make, and don’t worry,
                balances can even go negative. It’s all part of the fun!
              </p>
            </div>
          </Container>
          <Container as='li'>
            <div className='flex flex-col gap-2 text-accent'>
              <h1 className='font-semibold'>Expiry Dates</h1>
              <p>
                Some bets are a race against time! You can set an expiry date for your bets, so they
                stay open until the clock runs out. No rush—let the tension build!
              </p>
            </div>
          </Container>
          <Container as='li'>
            <div className='flex flex-col gap-2 text-accent'>
              <h1 className='font-semibold'>Fixed bid to enter</h1>
              <p>
                Every bet has a fixed amount you’ll need to wager to get in the game. No surprises
                here—just place your bet and you’re part of the action!
              </p>
            </div>
          </Container>
        </ul>
      </section>

      <section className='flex flex-col gap-4'>
        <Heading>Planned Features</Heading>
        <ul className='grid grid-cols-1 gap-2'>
          <Container as='li'>
            <div className='flex flex-col gap-2 text-accent'>
              <h1 className='font-semibold'>Bid raising</h1>
              <p>
                Get ready to raise the stakes! Soon, you’ll be able to increase your bid after
                someone else has placed theirs, just like in poker. Think you can outbid your
                friends? Prove it!
              </p>
            </div>
          </Container>
          <Container as='li'>
            <div className='flex flex-col gap-2 text-accent'>
              <h1 className='font-semibold'>A jury for closing bets</h1>
              <p>
                Right now, the creator of a bet has the final say in closing it. But we’re working
                on a feature that’ll let trusted users vote on the outcome, making things more
                exciting and fair.
              </p>
            </div>
          </Container>
          <Container as='li'>
            <div className='flex flex-col gap-2 text-accent'>
              <h1 className='font-semibold'>A reputation score</h1>
              <p>
                Let your track record speak for itself! We’re planning to introduce a reputation
                score that reflects your betting skills and your contribution as a jury member or
                creator. The more trusted you are, the higher your score!
              </p>
            </div>
          </Container>
          <Container as='li'>
            <div className='flex flex-col gap-2 text-accent'>
              <h1 className='font-semibold'>Custom Currencies</h1>{' '}
              <p>
                Why stop at Dice? Soon, you’ll be able to create your own custom currencies for even
                more fun! Want to bet with “Gems,” “Coins,” or something totally unique? The choice
                is yours. Make the game feel truly yours!
              </p>
            </div>
          </Container>
        </ul>
      </section>
    </main>
  );
}

function Heading({ as = 'h1', children, ...props }) {
  return <h1 className='text-2xl font-semibold'>{children}</h1>;
}
