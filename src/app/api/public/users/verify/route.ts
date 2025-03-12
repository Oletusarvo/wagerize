import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from 'betting_app/dbconfig';

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    if (!token) {
      return new NextResponse('Token missing!', {
        status: 401,
        statusText: 'Cannot verify user, because the verification token is missing.',
      });
    }

    const { user_id } = jwt.verify(token, process.env.TOKEN_SECRET) as { user_id: string };
    if (user_id) {
      //Check if the user is already verified
      const [user_status_id] = await db('users.user')
        .where({ id: user_id })
        .pluck('user_status_id');

      const [activeUserId] = await db('users.user_status').where({ label: 'Active' }).pluck('id');
      console.log(user_status_id, activeUserId);
      if (user_status_id == activeUserId) {
        return new NextResponse('User already verified!', { status: 401 });
      }

      await db.raw(
        ` UPDATE users.user 
          SET user_status_id = (SELECT id FROM users.user_status WHERE label = 'Active' LIMIT 1) 
          WHERE id = ?`,
        [user_id]
      );
      const newUrl = req.nextUrl.clone();
      newUrl.pathname = '/login';
      newUrl.searchParams.delete('token');
      return NextResponse.redirect(newUrl);
    } else {
      return new NextResponse('User id missing in payload!', {
        status: 500,
      });
    }
  } catch (err) {
    console.log(err.message);
    return new NextResponse('An unexpected error occured!', {
      status: 500,
    });
  }
}
