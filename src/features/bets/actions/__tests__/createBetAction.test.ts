import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import { createBetAction } from '../createBetAction';
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
});
