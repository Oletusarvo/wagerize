import { getSession } from '@/utils/getSession';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  console.log('Running middleware...');
  if (req.url.startsWith('/')) {
    const session = await getSession();
    if (session) {
      return NextResponse.redirect('/auth/dashboard');
    }
  }

  NextResponse.next();
}
