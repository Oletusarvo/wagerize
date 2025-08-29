'use server';
import { AuthError } from '@/features/auth/error/auth-error';
import { userService } from '@/features/users/services/user-service';
import { createJWT } from '@/utils/jwt-temp';
import { parseFormDataUsingSchema } from '@/utils/parse-form-data-using-schema';
import db from 'betting_app/dbconfig';
import { transport } from 'betting_app/nodemailer.config';
import { emailSchema } from '../schemas/password-reset-schema';

export async function sendPasswordResetLinkAction(
  payload: FormData
): Promise<ActionResponse<void, string>> {
  try {
    const { email } = parseFormDataUsingSchema(payload, emailSchema);
    //Create a reset token encoding the user id.
    const userId = await userService.repo.getIdByEmail(email, db);
    if (!userId) {
      throw new Error(AuthError.NOT_FOUND);
    }

    const token = createJWT({ userId }, { expiresIn: '60min' });

    const message = {
      from: 'nistikemisti@gmail.com',
      to: email,
      subject: 'Reset your Wagerize password',
      html: `
      <h1>Reset Your Password</h1>
      <p>
        <strong>Hi there!</strong><br/>
        Somebody, hopefully you, has requested to reset your password.<br/>
        If this was not you, then ignore this email.<br/>
        Otherwise, please click <a href="${process.env.DOMAIN_URL}/login/reset?token=${token}">here.</a><br/><br/>
        Best regards, the Wagerize team.
      </p>
    `,
    };

    await transport.sendMail(message);
    return { success: true };
  } catch (err) {
    console.log(err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}
