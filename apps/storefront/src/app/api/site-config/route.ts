import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
   const siteConfig = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })

   if (!siteConfig) {
      return NextResponse.json({})
   }

   return NextResponse.json(siteConfig)
}