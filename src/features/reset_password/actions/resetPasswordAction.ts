'use server';
import db from 'betting_app/dbconfig';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function resetPasswordAction(token: string, newCredentials: { password: string }) {
  const result: { code: number } = { code: 0 };
  try {
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET) as { userId: string };
    await db('users.user')
      .where({ id: userId })
      .update({
        password: await bcrypt.hash(newCredentials.password, 15),
      });
  } catch (err) {
    console.log(err.message);
    result.code = -1;
  }
  return result;
}
