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
      await db.raw(
        ` UPDATE users.user 
          SET user_status_id = (SELECT id FROM users.user_status WHERE label = 'Active' LIMIT 1) 
          WHERE id = ?`,
        [user_id]
      );
      const newUrl = req.nextUrl.clone();
      newUrl.pathname = `${process.env.NEXTAUTH_URL}/login`;
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
