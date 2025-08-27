'use server';

import db from 'betting_app/dbconfig';
import 'betting_app/loadenv';
import { registerCredentialsSchema } from '../schemas/registerCredentialsSchema';
import { AuthError, TAuthError } from '@/features/auth/error/AuthError';
import { parseFormDataUsingSchema } from '@/utils/parseUsingSchema';
import { getParseResultErrorMessage } from '@/utils/getParseResultErrorMessage';
import { hashPassword } from '@/utils/hashPassword';
import { verifyJWT } from '@/utils/JWT';

export async function registerUserAction(
  payload: FormData
): Promise<ActionResponse<void, TAuthError | 'error'>> {
  //Parse the credentials and insert the user into the database.
  const parsedPayload = parseFormDataUsingSchema(payload, registerCredentialsSchema);
  if (!parsedPayload.success) {
    return {
      success: false,
      error: getParseResultErrorMessage(parsedPayload),
    };
  }

  const trx = await db.transaction();
  try {
    const { token, username, password1: password, dateOfBirth } = parsedPayload.data;

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

    const [{ id: user_id }] = await trx('users.user')
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
