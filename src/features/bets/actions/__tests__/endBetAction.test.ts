import db from 'betting_app/dbconfig';
import { v4 } from 'uuid';
import { endBetAction } from '../endBetAction';

let users = [];
const outcomes = [];
const bidAmount = 100;
const creatorId = 0;
const betId = v4();
let result;

describe('Testing bet closure with one winner', () => {
  beforeAll(async () => {
    await setup({
      numUsers: 2,
      winnerIds: [0],
      loserIds: [1],
    });
    result = await endBetAction(betId, outcomes[creatorId].id);
  });

  afterAll(async () => await cleanup());

  it('Returns code 0', () => expect(result.code).toBe(0));
  it('Correctly increments the winners wallet, if they are the only one winnning', async () => {
    const wallet = await db('users.wallet')
      .where({ user_id: users.at(creatorId).id })
      .select('balance')
      .first();
    expect(parseInt(wallet.balance)).toBe(bidAmount * 2);
  });
});

describe('Testing bet closure with multiple winners, with an evenly divisible pool', () => {
  const winnerIds = [0, 1];
  const numUsers = 4;
  beforeAll(async () => {
    await setup({
      numUsers,
      winnerIds,
      loserIds: [2, 3],
    });

    result = await endBetAction(betId, outcomes[0].id);
  });

  afterAll(async () => await cleanup());

  it('Returns code 0', () => expect(result.code).toBe(0));
  it('Correctly increments the wallets of the winners.', async () => {
    const winners = await db('users.wallet')
      .whereIn(
        'user_id',
        winnerIds.map(w => users.at(w).id)
      )
      .select('id', 'balance');
    winners.forEach(w =>
      expect(parseInt(w.balance)).toBe((bidAmount * numUsers) / winnerIds.length)
    );
  });
});

async function setup(options: { numUsers: number; winnerIds: number[]; loserIds: number[] }) {
  const { numUsers, winnerIds, loserIds } = options;
  await cleanup();
  const trx = await db.transaction();

  //Create test users
  for (let i = 0; i < numUsers; ++i) {
    users.push({
      id: v4(),
      email: `test${i}@email.com`,
      password: '12345678',
    });
  }
  await trx('users.user').insert(users);
  //Create a bet
  await trx('bets.bet').insert({
    id: betId,
    author_id: users.at(creatorId).id,
    data: {
      title: 'Test-bet',
      min_bid: bidAmount,
    },
  });

  //Add outcomes
  for (let i = 0; i < 4; ++i) {
    outcomes.push({
      id: v4(),
      label: i.toString(),
      bet_id: betId,
    });
  }
  await trx('bets.outcome').insert(outcomes);

  //Add bids to the bet
  await trx('bets.bid').insert([
    ...winnerIds.map(i => ({
      user_id: users[i].id,
      amount: bidAmount,
      outcome_id: outcomes[0].id,
      bet_id: betId,
    })),
    ...loserIds.map(i => ({
      user_id: users[i].id,
      amount: bidAmount,
      outcome_id: outcomes[1].id,
      bet_id: betId,
    })),
  ]);

  await trx.commit();
}

async function cleanup() {
  const trx = await db.transaction();
  await trx('bets.bet').del();
  await trx('users.user').del();
  await trx.commit();
  users = [];
}
