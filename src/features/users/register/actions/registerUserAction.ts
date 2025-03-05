'use server';

import db from 'betting_app/dbconfig';
import { RegisterError } from '../types/RegisterError';
import bcrypt from 'bcrypt';

export async function registerUserAction(credentials: any) {
  const result: { code: string | number } = {
    code: 0,
  };

  try {
    const { email, password1 } = credentials;
    console.log(email);
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
