'use server';

import db from 'betting_app/dbconfig';
import 'betting_app/loadenv';
import { registerCredentialsSchema } from '../schemas/register-credentials-schema';
import { AuthError, TAuthError } from '@/features/auth/error/auth-error';
import { parseFormDataUsingSchema } from '@/utils/parse-form-data-using-schema';
import { hashPassword } from '@/utils/hash-password';
import { verifyJWT } from '@/utils/jwt';

export async function registerUserAction(
  payload: FormData
): Promise<ActionResponse<void, TAuthError | 'error'>> {
  //Parse the credentials and insert the user into the database.

  const trx = await db.transaction();
  try {
    const parsedPayload = parseFormDataUsingSchema(payload, registerCredentialsSchema);
    const { token, username, password1: password, dateOfBirth } = parsedPayload;

    let email: string;
    try {
      const decoded = verifyJWT(token) as { email: string };
      email = decoded.email;
    } catch {
      return {
        success: false,
        error: AuthError.TOKEN_INVALID,
      };
    }

    await trx('users.user')
      .insert({
        email,
        username,
        password: await hashPassword(password),
        date_of_birth: dateOfBirth,
      })
      .returning('id');

    await trx.commit();
    return { success: true };
  } catch (err) {
    trx.rollback();
    const msg = err.message;

    if (msg.toLowerCase().includes('duplicate')) {
      return {
        success: false,
        error: AuthError.DUPLICATE_USER,
      };
    } else {
      return {
        success: false,
        error: 'error',
      };
    }
  }
}
