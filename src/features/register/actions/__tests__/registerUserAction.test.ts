import db from 'betting_app/dbconfig';
import { registerUserAction } from '../register-user-action';
import { transport } from 'betting_app/nodemailer.config';
import { RegisterError } from '../../types/register-error';
require('dotenv').config({
  path: './.env.test',
});

jest.mock('betting_app/nodemailer.config');

const credentials = {
  email: 'test@email.com',
  password1: 'P@ssw0rd123!',
  password2: 'P@ssw0rd123!',
  dateOfBirth: new Date('09-29-1991').toISOString().split('T')[0],
};

describe('Testing user registration', () => {
  beforeEach(async () => {
    //Delete test users.
    await db('users.user').del();

    //Reset the calls on transport.sendMail.
    (transport.sendMail as jest.Mock).mockReset();
  });

  it('Registers a user', async () => {
    //Register a test user.
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

    //Check that the nodemailer sendMail-method was called with the email as the to-arg.
    expect(transport.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: credentials.email,
      })
    );

    //Delete the created test user.
    await db('users.user').where({ id: user.id }).del();
  }, 10000);

  it('Returns the user exists-error, if a user is already registered.', async () => {
    //Register a test user.
    await registerUserAction(credentials);

    //Try to register the same user again.
    const result = await registerUserAction(credentials);
    expect(result.code).toEqual('duplicate_user');

    //Should not have sent an email on the second try.
    expect(transport.sendMail).toHaveBeenCalledTimes(1);

    //There should not be a second user in the database.
    const users = await db('users.user').where({ email: credentials.email });
    expect(users).toHaveLength(1);

    //Delete the created test user.
    await db('users.user').where({ email: credentials.email }).del();
  }, 20000);

  it('Does not allow registration if a maximum number of users has been defined.', async () => {
    //Set the maximum number of users to 1.
    process.env.MAX_USERS = '1';

    //Register a test user.
    await registerUserAction(credentials);

    //Try to register a second user.
    const result = await registerUserAction({
      ...credentials,
      email: 'test2@email.com',
    });
    expect(result.code).toEqual('user_count');

    //Reset the maximum number of users.
    process.env.MAX_USERS = undefined;
  }, 20000);

  it('Does not allow registration with a password that does not meet the required criteria', async () => {
    // Define invalid passwords to test.
    const invalidPassword = '12345678';

    const invalidCredentials = {
      ...credentials,
      password1: invalidPassword,
      password2: invalidPassword,
    };

    const result = await registerUserAction(invalidCredentials);
    expect(result.code).toBe(RegisterError.INVALID_PASSWORD_FORMAT);

    // Ensure no user was created in the database.
    const user = await db('users.user').where({ email: invalidCredentials.email }).first();
    expect(user).toBeUndefined();

    // Ensure no email was sent.
    expect(transport.sendMail).not.toHaveBeenCalled();
  }, 30000);
});
