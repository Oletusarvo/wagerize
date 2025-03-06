import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const url = req.nextUrl.pathname;
  if (token) {
    //Disallow access to the front- login- or register pages once logged in.
    if (url === '/' || url === '/login' || url === '/register') {
      const newUrl = req.nextUrl.clone();
      newUrl.pathname = '/auth/dashboard';
      return NextResponse.redirect(newUrl);
    }
  } else {
    //Redirect to the login page if not logged in, and trying to access protected areas.
    if (url.startsWith('/auth')) {
      const newUrl = req.nextUrl.clone();
      newUrl.pathname = '/login';
      return NextResponse.redirect(newUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
