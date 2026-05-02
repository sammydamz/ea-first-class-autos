import { verifyJWT } from '@/lib/jwt'
import { getErrorResponse } from '@/lib/utils'
import { getAdminFromCookie } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl

   if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      const admin = await getAdminFromCookie()

      if (!admin) {
         return NextResponse.redirect(new URL('/admin/login', request.url))
      }
   }

   if (pathname.startsWith('/profile') || pathname.startsWith('/api')) {
      let token: string | undefined

      if (request.cookies.has('token')) {
         token = request.cookies.get('token')?.value
      } else if (request.headers.get('Authorization')?.startsWith('Bearer ')) {
         token = request.headers.get('Authorization')?.substring(7)
      }

      if (!token) {
         if (pathname.startsWith('/api')) {
            return getErrorResponse(401, 'INVALID TOKEN')
         }
         return NextResponse.redirect(new URL('/login', request.url))
      }

      try {
         const { sub } = await verifyJWT<{ sub: string }>(token)
         const response = NextResponse.next()
         response.headers.set('X-USER-ID', sub)
         return response
      } catch (error) {
         if (pathname.startsWith('/api')) {
            return getErrorResponse(401, 'UNAUTHORIZED')
         }
         const redirect = NextResponse.redirect(new URL('/login', request.url))
         redirect.cookies.delete('token')
         redirect.cookies.delete('logged-in')
         return redirect
      }
   }

   return NextResponse.next()
}

export const config = {
   matcher: ['/admin/:path*', '/profile/:path*', '/api/:path*'],
}