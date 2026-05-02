import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const banners = await prisma.banner.findMany({
         orderBy: { createdAt: 'desc' },
      })
      return NextResponse.json(banners)
   } catch (error) {
      console.error('[BANNERS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')
      if (!userId) { return new NextResponse('Unauthorized', { status: 401 }) }
      const body = await req.json()
      const { title, image, description, link, categoryId } = body
      if (!title || !image) {
         return new NextResponse('Title and image are required', { status: 400 })
      }
      const banner = await prisma.banner.create({
         data: {
            title,
            image,
            description: description || null,
            link: link || null,
            categoryId: categoryId || null,
         },
      })
      return NextResponse.json(banner)
   } catch (error) {
      console.error('[BANNERS_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
