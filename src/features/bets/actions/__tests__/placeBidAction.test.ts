import db from 'betting_app/dbconfig';
import { v4 } from 'uuid';
import { placeBidAction } from '../placeBidAction';
import { getSession } from '@/utils/getSession';
import { createBetAction } from '../createBetAction';
import { BetError } from '@/utils/error';

jest.mock('@/utils/getSession');
const userId = v4();
const betId = v4();
const amount = 10;

describe('Testing bid placement', () => {
  let result;
  beforeAll(async () => {
    (getSession as jest.Mock).mockResolvedValue({
      user: { id: userId },
    });

    //Delete all bets
    await db('bets.bet').del();
    //Delete all users
    await db('users.user').del();

    //Create a test user
    await db('users.user').insert({
      id: userId,
      email: 'test@email.com',
      password: '12345678',
    });

    //Create a test bet
    await db('bets.bet').insert({
      id: betId,
      author_id: userId,
      data: {
        title: 'Test',
        min_bid: 10,
      },
    });

    //Add mock outcomes
    const outcomes = await db('bets.outcome').insert(
      [
        { label: 'a', bet_id: betId },
        { label: 'b', bet_id: betId },
      ],
      ['id', 'label']
    );

    result = await placeBidAction({
      bet_id: betId,
      amount: 10,
      outcome_id: outcomes.find(o => o.label == 'a').id,
    });
  });

  afterAll(async () => {
    await db('bets.bet').del();
    await db('users.user').del();
  });

  it('Returns code 0', () => {
    expect(result.code).toBe(0);
  });

  it('Saves the bid', async () => {
    const bid = await db('bets.bid')
      .whereRaw(
        "bet_id = ? AND outcome_id = (SELECT id FROM bets.outcome WHERE label = 'a' AND bet_id = ? LIMIT 1)",
        [betId, betId]
      )
      .first();

    expect(bid).toBeDefined();
  });

  it('Correctly decrements the users wallet balance', async () => {
    const [currency_id] = await db('users.currency').where({ symbol: 'DICE' }).pluck('id');
    const wallet = await db('users.wallet')
      .where({ user_id: userId, currency_id })
      .select('balance')
      .first();
    expect(parseInt(wallet.balance)).toBe(-amount);
  });

  it('Prevents bidding if the user has hit their bid quota.', async () => {
    await db('bets.bet').del();
    const maxBids = 3;
    process.env.MAX_BIDS = maxBids.toString();

    (getSession as jest.Mock).mockResolvedValueOnce({ user: { id: userId } });

    //Create maxBids test bets, and insert a bid on each.
    const [walletId] = await db('users.wallet').where({ user_id: userId }).pluck('id');
    for (let i = 0; i < maxBids; ++i) {
      const betId = v4();
      await db('bets.bet').insert({
        id: betId,
        author_id: userId,
        data: {
          title: `Test bet ${i}`,
        },
      });

      //Add outcomes
      const [{ id: outcomeId }] = await db('bets.outcome')
        .insert({
          label: 'a',
          bet_id: betId,
        })
        .returning('id');

      //Add bid
      await db('bets.bid').insert({
        bet_id: betId,
        amount: 100,
        wallet_id: walletId,
        outcome_id: outcomeId,
      });
    }

    //Add one additional bet
    await db('bets.bet').insert({
      id: betId,
      author_id: userId,
      data: {
        title: `Test bet`,
      },
    });

    //Add outcomes
    const [{ id: outcomeId }] = await db('bets.outcome')
      .insert({
        label: 'a',
        bet_id: betId,
      })
      .returning('id');

    const result = await placeBidAction({
      amount: 100,
      wallet_id: walletId,
      bet_id: betId,
      outcome_id: outcomeId,
    });
    expect(result.code).toEqual(BetError.MAX_BIDS);
  });
});
