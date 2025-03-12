import { Button } from '@/components/feature/Button';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import pkg from 'betting_app/package.json';
import { Logo } from '@/components/Logo';
import { GitHub, Instagram, Twitter } from '@mui/icons-material';

export default async function Home() {
  return (
    <main className='pt-8 flex flex-col flex-1 gap-16 overflow-y-scroll'>
      <section className='flex xs:flex-col-reverse lg:flex-row gap-8 w-full xs:px-4 lg:px-default items-center'>
        <div className='flex flex-col w-full gap-4'>
          <Heading>{pkg.name} - A poker inspired betting app.</Heading>
          <p className='text-lg'>
            Welcome to <strong>{pkg.name}</strong> — where the fun never stops and the bets are
            always on! It all started with our friend group, constantly challenging each other with
            random bets. Instead of printing fake money to keep track of our wagers, we thought—why
            not make an app? And just like that, <strong>{pkg.name}</strong> was born! Now, you can
            create your own bets, challenge friends, and see who’s got the best instincts. Bets are
            placed using <strong>Dice</strong>, our virtual currency, and the best part? It’s
            totally free to play! So gather your crew, throw down some fun challenges, and let the
            games begin!
            <br />
            <br />
            <i className='text-sm text-gray-500'>
              Due to resource constraints, only a limited amount of users can register at this time.
              <strong> Users must be 18 years or older to register.</strong>
            </i>
          </p>
          <div className='xs:w-full lg:w-[25%] flex-col'>
            <Link href='/register'>
              <Button
                fullWidth
                type='button'
                color='accent'>
                Start Today
              </Button>
            </Link>
          </div>
        </div>
        <img
          width='300'
          height='300'
          src='/app-icon.svg'
          className='m-8'
        />
      </section>

      <Section>
        <Heading>Features</Heading>
        <ul className='grid xs:grid-cols-1 lg:grid-cols-3 gap-2'>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>Virtual Currency</ContainerHeading>
              <p>
                Place your bets with <strong>Dice</strong>—our virtual currency that lets you join
                in on any bet! There’s no limit to how many bets you can make, and don’t worry,
                balances can even go negative. It’s all part of the fun!
              </p>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>Expiry Dates</ContainerHeading>
              <p>
                Some bets are a race against time! You can set an expiry date for your bets, so they
                stay open until the clock runs out. No rush—let the tension build!
              </p>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>Fixed bid to enter</ContainerHeading>
              <p>
                Every bet has a fixed amount you’ll need to wager to get in the game. No surprises
                here—just place your bet and you’re part of the action!
              </p>
            </ContainerBody>
          </Container>
        </ul>
      </Section>

      <Section>
        <Heading>Planned Features</Heading>
        <ul className='grid xs:grid-cols-1 lg:grid-cols-2 gap-2'>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>Bid raising</ContainerHeading>
              <p>
                Get ready to raise the stakes! Soon, you’ll be able to increase your bid after
                someone else has placed theirs, just like in poker. Think you can outbid your
                friends? Prove it!
              </p>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>A jury for closing bets</ContainerHeading>
              <p>
                Right now, the creator of a bet has the final say in closing it. But we’re working
                on a feature that’ll let trusted users vote on the outcome, making things more
                exciting and fair.
              </p>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>A reputation score</ContainerHeading>
              <p>
                Let your track record speak for itself! We’re planning to introduce a reputation
                score that reflects your betting skills and your contribution as a jury member or
                creator. The more trusted you are, the higher your score!
              </p>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>Custom Currencies</ContainerHeading>{' '}
              <p>
                Why stop at Dice? Soon, you’ll be able to create your own custom currencies for even
                more fun! Want to bet with “Gems,” “Coins,” or something totally unique? The choice
                is yours. Make the game feel truly yours!
              </p>
            </ContainerBody>
          </Container>
        </ul>
      </Section>
      <footer className='flex w-full py-8 bg-gradient-to-b from-accent to-[#8b4f8c] lg:px-default xs:px-4 text-white flex-col gap-8'>
        <div className='flex flex-col gap-2 w-full'>
          <Link
            href='/tos'
            target='_blank'>
            <span className='text-white font-semibold'>Terms Of Service</span>
          </Link>
          <Link
            target='_blank'
            href='/privacy'>
            <span className='text-white font-semibold'>Privacy Policy</span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
              <Logo />
              <span className='w-full text-sm'>&copy; oletusarvo 2025</span>
            </div>

            <div className='flex gap-4'>
              <Link
                target='_blank'
                href='https://github.com/Oletusarvo/wagerize'>
                <GitHub sx={{ color: 'white' }} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Heading({ as = 'h1', children, ...props }) {
  return <h1 className='text-2xl font-semibold text-accent'>{children}</h1>;
}

function ContainerHeading({ children }) {
  return <h1 className='text-accent font-semibold'>{children}</h1>;
}

function ContainerBody({ children }) {
  return <div className='flex flex-col gap-2'>{children}</div>;
}

function Section({ children }) {
  return <section className='flex flex-col gap-4 lg:px-default xs:px-4'>{children}</section>;
}
