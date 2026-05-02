import prisma from '@/lib/prisma'
import { signJWT } from '@/lib/jwt'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
   try {
      const { email, password } = await req.json()

      if (!email || !password) {
         return new NextResponse('Email and password are required', { status: 400 })
      }

      const admin = await prisma.admin.findUnique({ where: { email } })

      if (!admin) {
         return new NextResponse('Invalid credentials', { status: 401 })
      }

      const isValid = await bcrypt.compare(password, admin.passwordHash)
      if (!isValid) {
         return new NextResponse('Invalid credentials', { status: 401 })
      }

      const token = await signJWT({ sub: admin.id }, { exp: '7d' })

      const response = NextResponse.json({ id: admin.id, email: admin.email, name: admin.name })

      response.cookies.set('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax',
         maxAge: 60 * 60 * 24 * 7,
         path: '/',
      })

      response.cookies.set('logged-in', 'true', {
         httpOnly: false,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax',
         maxAge: 60 * 60 * 24 * 7,
         path: '/',
      })

      return response
   } catch (error) {
      console.error('[ADMIN_LOGIN]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
