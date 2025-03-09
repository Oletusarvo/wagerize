'use server';

import db from 'betting_app/dbconfig';
import { RegisterError } from '../types/RegisterError';
import bcrypt from 'bcrypt';
import 'betting_app/loadenv';

export async function registerUserAction(credentials: any) {
  const result: { code: string | number } = {
    code: 0,
  };

  try {
    const maxUsers = process.env.MAX_USERS ? parseInt(process.env.MAX_USERS) : null;
    if (maxUsers && maxUsers > 0) {
      //Limit the number of users allowed to register
      const [{ count }] = await db('users.user').count('* as count');
      const userCount = typeof count === 'string' ? parseInt(count) : count;
      if (userCount >= maxUsers) {
        result.code = RegisterError.USER_COUNT;
        return result;
      }
    }

    const { email, password1 } = credentials;
    const encyrptedPassword = await bcrypt.hash(password1, 15);
    await db('users.user').insert({
      email,
      password: encyrptedPassword,
    });
  } catch (err) {
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
