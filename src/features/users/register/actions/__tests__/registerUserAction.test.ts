import db from 'betting_app/dbconfig';
import { registerUserAction } from '../registerUserAction';

const credentials = {
  email: 'test@email.com',
  password1: '12345678',
  password2: '12345678',
};

describe('Testing user registration', () => {
  it('Registers a user', async () => {
    //Delete the test user if it exists.
    await db('users.user').where({ email: credentials.email }).del();

    const result = await registerUserAction(credentials);
    expect(result.code).toBe(0);

    //Check that there is a user in the database.
    const user = await db('users.user').where({ email: credentials.email }).first();
    expect(user).not.toBeUndefined();

    //Make sure the password exists, but is not a plain-text version of what was passed.
    expect(user.password).toBeDefined();
    expect(user.password).not.toBe(credentials.password1);

    //Delete the created test user.
    await db('users.user').where({ id: user.id }).del();
  }, 10000);
});
