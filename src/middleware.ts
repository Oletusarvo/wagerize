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
  const url = req.nextUrl;

  if (
    (req.method === 'POST' && url.pathname === '/register') ||
    url.pathname === '/api/public/users/resend_verification_email' ||
    url.pathname === '/api/public/users/verify'
  ) {
    //Limit the number of times a user is allowed to hit these endpoints.
    const res = await rateLimiter.limit(req);
    if (res.status !== 200) {
      return res;
    }
  }

  if (token) {
    //Disallow access to the front- login- or register pages once logged in.
    if (
      url.pathname === '/' ||
      url.pathname.includes('/login') ||
      url.pathname.includes('/register')
    ) {
      const newUrl = url.clone();
      newUrl.pathname = '/auth/dashboard';
      return NextResponse.redirect(newUrl);
    }
  } else {
    //Redirect to the login page if trying to access protected areas while not logged in.
    if (url.pathname.startsWith('/auth')) {
      const newUrl = url.clone();
      newUrl.pathname = '/login';
      newUrl.searchParams.set('callback', url.pathname);
      return NextResponse.redirect(newUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/:path*', '/login', '/register', '/api/:path*'],
};
