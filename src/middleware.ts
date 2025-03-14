import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { RateLimiter } from './utils/rateLimiter';

const rateLimiter = new RateLimiter({
  requestLimit: 10,
  cooldownTime: 120000,
  ttl: 60000,
  logging: true,
});

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const url = req.nextUrl.pathname;

  if (
    (req.method === 'POST' && url === '/register') ||
    url === '/api/public/users/resend_verification_email' ||
    url === '/api/public/users/verify'
  ) {
    //Limit the number of times a user is allowed to hit these endpoints.
    const res = await rateLimiter.limit(req);
    if (res.status !== 200) {
      return res;
    }
  }

  if (token) {
    //Disallow access to the front- login- or register pages once logged in.
    if (url === '/' || url.includes('/login') || url.includes('/register')) {
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
  matcher: ['/', '/auth/:path*', '/login', '/register', '/api/:path*'],
};
