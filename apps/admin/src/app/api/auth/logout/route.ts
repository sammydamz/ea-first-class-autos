import { NextResponse } from 'next/server'

export async function POST() {
   try {
      const response = NextResponse.json({ message: 'Logged out' })

      response.cookies.set('token', '', {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax',
         maxAge: 0,
         path: '/',
      })

      response.cookies.set('logged-in', '', {
         httpOnly: false,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax',
         maxAge: 0,
         path: '/',
      })

      return response
   } catch (error) {
      console.error('[LOGOUT]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
