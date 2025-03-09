import db from 'betting_app/dbconfig';
import { registerUserAction } from '../registerUserAction';

const credentials = {
  email: 'test@email.com',
  password1: '12345678',
  password2: '12345678',
};

describe('Testing user registration', () => {
  it('Registers a user', async () => {
    //Delete test users.
    await db('users.user').del();
    const result = await registerUserAction(credentials);
    expect(result.code).toBe(0);

    //Check that there is a user in the database.
    const user = await db('users.user').where({ email: credentials.email }).first();
    expect(user).not.toBeUndefined();

    //Make sure the password exists, but is not a plain-text version of what was passed.
    expect(user.password).toBeDefined();
    expect(user.password).not.toBe(credentials.password1);

    //Make sure there is a wallet for DICE.
    const [currency_id] = await db('users.currency').where({ symbol: 'DICE' }).pluck('id');
    const wallet = await db('users.wallet').where({ user_id: user.id, currency_id }).first();
    expect(wallet).toBeDefined();

    //Delete the created test user.
    await db('users.user').where({ id: user.id }).del();
  }, 10000);
});
