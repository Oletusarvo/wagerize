import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const url = req.nextUrl.pathname;
  if (token) {
    //Disallow access to the front- login- or register pages once logged in.
    if (url === '/' || url === '/login' || url === '/register') {
      return redirectTo('/auth/dashboard', req);
    }
  } else {
    //Redirect to the login page if trying to access protected areas while not logged in.
    if (url.startsWith('/auth')) {
      return redirectTo('/login', req);
    }
  }

  return NextResponse.next();
}

function redirectTo(url: string, req: NextRequestWithAuth) {
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = url;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/', '/auth/:path*', '/login', '/register'],
};
