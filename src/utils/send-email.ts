import { transport } from 'betting_app/nodemailer.config';

export async function sendHTMLEmail(message: Record<string, string>) {
  await transport.sendMail(message);
}
