import { getSession } from '@/utils/load-session';
import db from 'betting_app/dbconfig';
import { createBetAction } from '../create-bet-action';
import { v4 } from 'uuid';
import { revalidatePath } from 'next/cache';

const userId = v4();
jest.mock('@/utils/getSession');
jest.mock('next/cache');

describe('Testing bet creation.', () => {
  beforeAll(async () => {
    //Delete all users
    await db('users.user').del();
    //Create a test user.
    await db('users.user').insert({
      email: 'test@gmail.com',
      password: '12345678',
      id: userId,
    });

    //Delete all bets.
    await db('bets.bet').del();
  });

  afterAll(async () => {
    await db('bets.bet').del();
    await db('users.user').del();
  });

  it('Creates a bet correctly', async () => {
    (getSession as jest.Mock).mockResolvedValue({
      user: { id: userId },
    });
    const outcomes = ['a', 'b', 'c'];
    const result = await createBetAction(
      {
        data: {
          title: 'Test',
          min_bid: 100,
        },
      },
      outcomes
    );

    expect(result.code).toBe(0);
    expect(revalidatePath).toHaveBeenCalledTimes(1);

    //Make sure there is only one bet created.
    const bets = await db('bets.bet').whereRaw("data->>'title' = ?", ['Test']);
    expect(bets.length).toBe(1);

    //Make sure there are no duplicate outcomes inserted.
    const savedOutcomes = await db('bets.outcome')
      .where({ bet_id: bets.at(0).id })
      .select('label');
    expect(savedOutcomes.map(o => o.label)).toEqual(outcomes);
  });

  it('Prevents bet creation when user hits the bet count limit', async () => {
    //Delete all bets
    await db('bets.bet').del();

    const maxBets = 3;
    process.env.MAX_BETS = maxBets.toString();

    (getSession as jest.Mock).mockResolvedValue({
      user: { id: userId },
    });

    // Insert maxBets number of bets for the user
    const [currency_id] = await db('users.currency').where({ symbol: 'DICE' }).pluck('id');
    for (let i = 0; i < maxBets; i++) {
      await db('bets.bet').insert({
        author_id: userId,
        data: { title: `Test ${i}`, min_bid: 100 },
        currency_id,
      });
    }

    const outcomes = ['x', 'y', 'z'];
    const result = await createBetAction(
      {
        data: {
          title: 'Exceed Limit Test',
          min_bid: 100,
        },
      },
      outcomes
    );

    expect(result.code).toBe('quota_full');

    // Ensure no additional bet was created
    const bets = await db('bets.bet').where({ author_id: userId });
    expect(bets.length).toBe(maxBets);
  });

  it('Prevents bet creation when outcomes exceed the maximum allowed', async () => {
    const maxOutcomes = 5;
    process.env.MAX_OUTCOMES = maxOutcomes.toString();

    (getSession as jest.Mock).mockResolvedValue({
      user: { id: userId },
    });

    const outcomes = Array.from({ length: maxOutcomes + 1 }, (_, i) => `Outcome ${i + 1}`);
    const result = await createBetAction(
      {
        data: {
          title: 'Exceed Outcomes Test',
          min_bid: 100,
        },
      },
      outcomes
    );

    expect(result.code).toBe('max_outcomes');

    // Ensure no bet was created
    const bets = await db('bets.bet').whereRaw("data->>'title' = ?", ['Exceed Outcomes Test']);
    expect(bets.length).toBe(0);
  }, 10000);
});
