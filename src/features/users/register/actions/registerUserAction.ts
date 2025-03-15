'use server';

import db from 'betting_app/dbconfig';
import { RegisterError } from '../types/RegisterError';
import bcrypt from 'bcrypt';
import 'betting_app/loadenv';
import { transport } from 'betting_app/nodemailer.config';
import jwt from 'jsonwebtoken';
import { registerCredentialsSchema } from '../schemas/registerCredentialsSchema';

export async function registerUserAction(credentials: any) {
  const result: { code: string | number } = {
    code: 0,
  };

  const trx = await db.transaction();
  try {
    const maxUsers = process.env.MAX_USERS ? parseInt(process.env.MAX_USERS) : null;
    if (maxUsers && maxUsers > 0) {
      //Limit the number of users allowed to register. A maxUsers setting of zero means no limit.
      const [{ count }] = await trx('users.user').count('* as count');
      const userCount = typeof count === 'string' ? parseInt(count) : count;
      if (userCount >= maxUsers) {
        throw new Error(RegisterError.USER_COUNT);
      }
    }

    //Parse the credentials and insert the user into the database.
    registerCredentialsSchema.parse(credentials);
    const { email, password1: password } = credentials;
    const encyrptedPassword = await bcrypt.hash(password, 15);
    const [{ id: user_id }] = await trx('users.user')
      .insert({
        email,
        password: encyrptedPassword,
        date_of_birth: credentials.dateOfBirth,
      })
      .returning('id');

    //Send a verification email to the new user
    await sendActivationEmailAction(user_id, email);
    await trx.commit();
  } catch (err) {
    await trx.rollback();
    const msg = err.message;
    console.log(err.message);
    if (msg.toLowerCase().includes('duplicate')) {
      result.code = RegisterError.DUPLICATE_USER;
    } else if (msg === RegisterError.USER_COUNT) {
      result.code = RegisterError.USER_COUNT;
    } else {
      result.code = -1;
    }
  }
  return result;
}

export async function sendActivationEmailAction(user_id: string, email: string) {
  const activationToken = jwt.sign({ user_id }, process.env.TOKEN_SECRET, {
    expiresIn: '1d',
  });

  const message = {
    from: 'nistikemisti@gmail.com',
    to: email,
    subject: 'Please verify your email.',
    html: `
      <h1>Verify Your Email</h1>
      <strong>Hi there!</strong><br/>
      It seems you have requested to create an account at <strong>Wagerize</strong><br/>
      If this was not you, you can safely ignore this email.<br/><br/>
      Otherwise, please click on <a href="${process.env.DOMAIN_URL}/api/public/users/verify?token=${activationToken}">this link</a> to verify your email.<br/><br/>
    
      Best regards, the Wagerize team.
    `,
  };

  await transport.sendMail(message);
}
