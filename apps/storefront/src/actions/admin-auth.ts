'use server'

import prisma from '@/lib/prisma'
import { signJWT } from '@/lib/jwt'
import { setAdminCookie, removeAdminCookie } from '@/lib/auth'
import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function loginAdmin(email: string, password: string) {
   'use server'

   const admin = await prisma.admin.findUnique({
      where: { email },
   })

   if (!admin) {
      return { error: 'Invalid email or password' }
   }

   const isValidPassword = await compare(password, admin.passwordHash)

   if (!isValidPassword) {
      return { error: 'Invalid email or password' }
   }

   const token = await signJWT(
      { sub: admin.id },
      { exp: '7d' }
   )

   await setAdminCookie(token)

   return { success: true }
}

export async function logoutAdmin() {
   'use server'

   await removeAdminCookie()
   redirect('/admin/login')
}