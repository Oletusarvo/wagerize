'use server';

import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';

export async function deleteUserAction() {
  const result = {
    code: 0,
  };
  try {
    const session = await getSession();
    await db('users.user').where({ id: session.user.id }).del();
  } catch (err) {
    console.log(err.message);
    result.code = -1;
  }
  return result;
}
