import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, props: { params: Promise<{ bannerId: string }> }) {
   const params = await props.params;
   try {
      const userId = req.headers.get('X-USER-ID')
      if (!userId) { return new NextResponse('Unauthorized', { status: 401 }) }
      if (!params.bannerId) { return new NextResponse('Banner id is required', { status: 400 }) }
      const banner = await prisma.banner.findUnique({ where: { id: params.bannerId } })
      return NextResponse.json(banner)
   } catch (error) {
      console.error('[BANNER_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function PATCH(req: Request, props: { params: Promise<{ bannerId: string }> }) {
   const params = await props.params;
   try {
      const userId = req.headers.get('X-USER-ID')
      if (!userId) { return new NextResponse('Unauthorized', { status: 401 }) }
      const body = await req.json()
      const { title, image, description, link } = body
      if (!params.bannerId) { return new NextResponse('Banner id is required', { status: 400 }) }
      const updatedBanner = await prisma.banner.update({
         where: { id: params.bannerId },
         data: {
            ...(title !== undefined && { title }),
            ...(image !== undefined && { image }),
            ...(description !== undefined && { description }),
            ...(link !== undefined && { link }),
         },
      })
      return NextResponse.json(updatedBanner)
   } catch (error) {
      console.error('[BANNER_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(req: Request, props: { params: Promise<{ bannerId: string }> }) {
   const params = await props.params;
   try {
      const userId = req.headers.get('X-USER-ID')
      if (!userId) { return new NextResponse('Unauthorized', { status: 401 }) }
      if (!params.bannerId) { return new NextResponse('Banner id is required', { status: 400 }) }
      const banner = await prisma.banner.delete({ where: { id: params.bannerId } })
      return NextResponse.json(banner)
   } catch (error) {
      console.error('[BANNER_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
