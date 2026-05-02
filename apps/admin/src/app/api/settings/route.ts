import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const settings = await prisma.siteConfig.findUnique({ where: { id: 'default' } })
      return NextResponse.json(settings)
   } catch (error) {
      console.error('[SETTINGS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function PATCH(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')
      if (!userId) { return new NextResponse('Unauthorized', { status: 401 }) }
      const body = await req.json()
      const { businessName, businessAddress, businessPhone, businessEmail, defaultWhatsApp } = body

      const settings = await prisma.siteConfig.upsert({
         where: { id: 'default' },
         update: { businessName, businessAddress, businessPhone, businessEmail, defaultWhatsApp },
         create: { id: 'default', businessName, businessAddress, businessPhone, businessEmail, defaultWhatsApp },
      })

      return NextResponse.json(settings)
   } catch (error) {
      console.error('[SETTINGS_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
