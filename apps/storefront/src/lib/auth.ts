import { cookies } from 'next/headers'
import { verifyJWT } from './jwt'

const COOKIE_NAME = 'admin-token'

export async function getAdminCookie(): Promise<string | undefined> {
   const cookieStore = await cookies()
   return cookieStore.get(COOKIE_NAME)?.value
}

export async function setAdminCookie(token: string): Promise<void> {
   const cookieStore = await cookies()
   cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
   })
}

export async function removeAdminCookie(): Promise<void> {
   const cookieStore = await cookies()
   cookieStore.delete(COOKIE_NAME)
}

export async function getAdminFromCookie(): Promise<{ adminId: string } | null> {
   const token = await getAdminCookie()
   if (!token) return null

   const payload = await verifyJWT<{ sub: string }>(token)
   if (!payload?.sub) return null

   return { adminId: payload.sub }
}

export async function isAuthenticated(): Promise<boolean> {
   const admin = await getAdminFromCookie()
   return admin !== null
}