import { sendActivationEmailAction } from '@/features/users/register/actions/registerUserAction';
import db from 'betting_app/dbconfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    if (!email) {
      return new NextResponse('Email missing!', {
        status: 401,
        statusText: 'Cannot resend verification email, because the email is missing.',
      });
    }
    // Send the email here
    const [userId] = await db('users.user').where({ email }).pluck('id');
    await sendActivationEmailAction(userId, email);
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = '/login';
    newUrl.searchParams.delete('email');
    return NextResponse.redirect(newUrl);
  } catch (err) {
    console.log(err.message);
    return new NextResponse('An unexpected error occured!', {
      status: 500,
    });
  }
}
