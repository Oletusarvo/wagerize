import { Button } from '@/components/feature/Button';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import pkg from 'betting_app/package.json';
import { Logo } from '@/components/Logo';
import { GitHub, Support } from '@mui/icons-material';
import { Die } from '@/components/ui/Die';

export default async function Home() {
  return (
    <main className='pt-8 flex flex-col flex-1 gap-16 overflow-y-scroll h-full'>
      <section className='flex xs:flex-col-reverse lg:flex-row gap-8 w-full xs:px-4 lg:px-default items-center'>
        <div className='flex flex-col w-full gap-4 animate-slide-right'>
          <Heading>{pkg.name} - A poker inspired challenge app.</Heading>
          <p className='text-lg'>
            Welcome to <strong>{pkg.name}</strong> — the ultimate challenge app where friendly
            competition meets pure fun! It all started with our friend group, always coming up with
            creative challenges. Instead of keeping score on paper, we thought—why not make an app?
            And just like that, <strong>{pkg.name}</strong> was born! Now, you can create your own
            friendly challenges, invite friends, and see who has the best instincts. Points are
            tracked using <strong>Dice</strong>, our virtual currency, and the best part? It’s 100%
            free to play, with no real money involved! So gather your crew, set up some fun
            challenges, and let the games begin!
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
                Register For Free
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
              <ContainerIcon>
                <Die numPips={1} />
              </ContainerIcon>

              <ContainerHeading>Virtual Currency</ContainerHeading>
              <ContainerParagraph>
                Use <strong>Dice</strong>—our virtual currency—to take on fun challenges! There’s no
                limit to how many you can join, and even if your balance goes negative, it’s all
                just for fun. No real money is involved—just friendly competition!
              </ContainerParagraph>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerIcon>
                <Die numPips={2} />
              </ContainerIcon>

              <ContainerHeading>Expiry Dates</ContainerHeading>
              <ContainerParagraph>
                Some challenges are a race against time! You can set an expiry date on them, so they
                stay open until the clock runs out. No rush—let the tension build!
              </ContainerParagraph>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerIcon>
                <Die numPips={3} />
              </ContainerIcon>

              <ContainerHeading>Fixed bid to enter</ContainerHeading>
              <ContainerParagraph>
                Every challenge has a set entry cost in <strong>Dice</strong>, so you’ll always know
                what it takes to join. No surprises—just jump in and enjoy the fun!
              </ContainerParagraph>
            </ContainerBody>
          </Container>
        </ul>
      </Section>

      <Section>
        <Heading>Planned Features</Heading>
        <ul className='grid xs:grid-cols-1 lg:grid-cols-2 gap-2'>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>Challenge raising and folding</ContainerHeading>
              <ContainerParagraph>
                Get ready to take the competition up a notch! Soon, you’ll be able to raise your
                challenge after someone else has placed theirs. Think you can outlast your friends?
                Prove it!
              </ContainerParagraph>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>A jury for closing challenges</ContainerHeading>
              <ContainerParagraph>
                Right now, the creator of a challenge has the final say in closing it. But we’re
                working on a feature that’ll let trusted users vote on the outcome, making things
                more exciting and fair.
              </ContainerParagraph>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>A reputation score</ContainerHeading>
              <ContainerParagraph>
                Let your track record speak for itself! We’re planning to introduce a reputation
                score that reflects your skills and your contribution as a jury member or creator.
                The more trusted you are, the higher your score!
              </ContainerParagraph>
            </ContainerBody>
          </Container>
          <Container as='li'>
            <ContainerBody>
              <ContainerHeading>Custom Currencies</ContainerHeading>{' '}
              <ContainerParagraph>
                Why stop at Dice? Soon, you’ll be able to create your own custom currencies for even
                more fun! Want to play with “Gems,” “Coins,” or something totally unique? The choice
                is yours. Make the game feel truly yours!
              </ContainerParagraph>
            </ContainerBody>
          </Container>
        </ul>
      </Section>
      <Section hidden>
        <Heading>Support</Heading>
        <p className='text-lg lg:w-[75%] xs:w-full'>
          Like the app? Please consider donating. Your support helps with development, maintenance,
          and bringing new features to life. Every contribution makes a difference—
          <strong>thank you!</strong>
        </p>
        <div className='xs:w-full lg:w-[25%] flex-col'>
          <Link
            href='https://www.paypal.com/donate/?hosted_button_id=MRWU7VZXGYTLN'
            target='_blank'>
            <Button
              fullWidth
              color='accent'
              type='button'>
              Make a donation
            </Button>
          </Link>
        </div>
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

function ContainerIcon({ children }) {
  return <div className='mb-4'>{children}</div>;
}

function Heading({ as = 'h1', children, ...props }) {
  return <h1 className='text-2xl font-semibold text-accent'>{children}</h1>;
}

function ContainerHeading({ children }) {
  return <h1 className='text-accent font-semibold text-lg'>{children}</h1>;
}

function ContainerParagraph({ children }) {
  return <p className='text-slate-600'>{children}</p>;
}

function ContainerBody({ children }) {
  return <div className='flex flex-col gap-2'>{children}</div>;
}

function Section({ children, ...props }) {
  return (
    <section
      {...props}
      className='flex flex-col gap-4 lg:px-default xs:px-4'>
      {children}
    </section>
  );
}
