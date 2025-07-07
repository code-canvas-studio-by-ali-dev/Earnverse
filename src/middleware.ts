import { NextRequest } from 'next/server';
import checkVerifyCookie from './middlware/check_human_verify';

export async function middleware(request: NextRequest) {
  return checkVerifyCookie(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};