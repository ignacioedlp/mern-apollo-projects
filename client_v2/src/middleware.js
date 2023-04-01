import { NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(req) {
  // Get token from local storage with key "user"
  const token = req.cookies.get('user')?.value

  const verified = token && (
    await verifyAuth(token).catch((err) => {
      console.log(err);
    })
  )

  // // If token is not valid, redirect to login page
  if (req.nextUrl.pathname.startsWith('/login') && !verified) {
    return
  }

  if (req.url.includes('/login') && verified) {
    return NextResponse.redirect(new URL("/project", req.url));
  }

  if (!verified) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

}

export const config = {
  matcher: [
    '/project',
    '/login',
    '/project/[id]',
    '/profile',
  ]
}