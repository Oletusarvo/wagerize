'use server';

import db from 'betting_app/dbconfig';
import { RegisterError } from '../types/RegisterError';
import bcrypt from 'bcrypt';
import 'betting_app/loadenv';
import { transport } from 'betting_app/nodemailer.config';
import jwt from 'jsonwebtoken';

export async function registerUserAction(credentials: any) {
  const result: { code: string | number } = {
    code: 0,
  };

  const trx = await db.transaction();
  try {
    const maxUsers = process.env.MAX_USERS ? parseInt(process.env.MAX_USERS) : null;
    if (maxUsers && maxUsers > 0) {
      //Limit the number of users allowed to register
      const [{ count }] = await trx('users.user').count('* as count');
      const userCount = typeof count === 'string' ? parseInt(count) : count;
      if (userCount >= maxUsers) {
        result.code = RegisterError.USER_COUNT;
        return result;
      }
    }

    const { email, password1 } = credentials;
    const encyrptedPassword = await bcrypt.hash(password1, 15);
    const [{ id: user_id }] = await trx('users.user')
      .insert({
        email,
        password: encyrptedPassword,
      })
      .returning('id');

    //Send a verification email to the new user
    await sendActivationEmail(user_id, email);
    await trx.commit();
  } catch (err) {
    await trx.rollback();
    const msg = err.message;
    console.log(err.message);
    if (msg.toLowerCase().includes('duplicate')) {
      result.code = RegisterError.DUPLICATE_USER;
    } else {
      result.code = -1;
    }
  }
  return result;
}

async function sendActivationEmail(user_id: string, email: string) {
  const activationToken = jwt.sign({ user_id }, process.env.TOKEN_SECRET);
  const message = {
    from: 'nistikemisti@gmail.com',
    to: email,
    subject: 'Please verify you Wagerize account.',
    html: `
      <h1>Verify Your Wagerize Account</h1>
      <strong>Hi there!</strong><br/>
      It seems you have created an account at <a href="https://wagerize.onrender.com">Wagerize</a><br/>
      If this was not you, you can safely ignore this email. Inactive accounts are deleted after 30 days.<br/>
      Otherwise, please click on <a href="https://wagerize.onrender.com/api/public/users/verify?token=${activationToken}">this link</a>.<br/><br/>
      Best regards, the Wagerize team.
    `,
  };

  await transport.sendMail(message);
}
