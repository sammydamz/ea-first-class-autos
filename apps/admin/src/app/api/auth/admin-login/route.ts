import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
   try {
      const { email, password } = await req.json()

      const admin = await prisma.admin.findUnique({
         where: { email },
      })

      if (!admin) {
         return new NextResponse('Invalid credentials', { status: 401 })
      }

      const isValid = await bcrypt.compare(password, admin.passwordHash)

      if (!isValid) {
         return new NextResponse('Invalid credentials', { status: 401 })
      }

      // Set cookie
      cookies().set('admin-session', admin.id, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax',
         maxAge: 60 * 60 * 24, // 1 day
         path: '/',
      })

      return NextResponse.json({ id: admin.id, email: admin.email })
   } catch (error) {
      console.error('[ADMIN_LOGIN]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}