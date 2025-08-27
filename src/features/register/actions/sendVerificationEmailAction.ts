'use server';

import { createJWT } from '@/utils/JWT';
import { parseFormDataUsingSchema } from '@/utils/parseUsingSchema';
import { sendHTMLEmail } from '@/utils/sendEmail';
import { registerEmailSchema } from '../schemas/registerCredentialsSchema';
import { AuthError, TAuthError } from '@/features/auth/error/AuthError';
import db from 'betting_app/dbconfig';
import { tablenames } from '@/tablenames';

export async function sendVerificationEmailAction(
  payload: FormData
): Promise<ActionResponse<void, TAuthError>> {
  const maxUsers = process.env.MAX_USERS ? parseInt(process.env.MAX_USERS) : null;
  if (maxUsers && maxUsers > 0) {
    //Limit the number of users allowed to register. A maxUsers setting of zero means no limit.
    const [{ count }] = await db('users.user').count('* as count');
    const userCount = typeof count === 'string' ? parseInt(count) : count;
    if (userCount >= maxUsers) {
      return {
        success: false,
        error: AuthError.USER_QUOTA_FULL,
      };
    }
  }
  const parseResult = parseFormDataUsingSchema(payload, registerEmailSchema);
  if (!parseResult.success) {
    return {
      success: false,
      error: AuthError.EMAIL_INVALID,
    };
  }
  const { email } = parseResult.data;
  //Prevent registering with a duplicate email
  const userRecord = await db(tablenames.user).where({ email }).select('id').first();
  if (userRecord) {
    return {
      success: false,
      error: AuthError.DUPLICATE_USER,
    };
  }

  const token = createJWT({ email }, { expiresIn: '1d' });

  const message = {
    from: 'nistikemisti@gmail.com',
    to: email,
    subject: 'Please verify your email.',
    html: `
      <h1>Verify Your Email</h1>
      <strong>Hi there!</strong><br/>
      It seems you have requested to create an account at <strong>Wagerize</strong><br/>
      If this was not you, you can safely ignore this email.<br/><br/>
      Otherwise, please click on <a href="${process.env.DOMAIN_URL}/register?token=${token}">this link</a> to continue the registration process.<br/><br/>
    
      Best regards, the Wagerize team.
    `,
  };

  await sendHTMLEmail(message);
  return { success: true };
}
