'use server';
import db from 'betting_app/dbconfig';
import { transport } from 'betting_app/nodemailer.config';
import jwt from 'jsonwebtoken';

export async function sendPasswordResetLinkAction(email: string) {
  const result: { code: number } = { code: 0 };
  try {
    //Create a reset token encoding the user id.
    const [userId] = await db('users.user').where({ email }).pluck('id');
    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET);

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
  } catch (err) {
    console.log(err.message);
    result.code = -1;
  }
  return result;
}
