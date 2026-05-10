import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const categories = await prisma.category.findMany({
         include: { _count: { select: { products: true } } },
         orderBy: [{ type: 'asc' }, { position: 'asc' }],
      })
      return NextResponse.json(categories)
   } catch (error) {
      console.error('[CATEGORIES_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const { name, description, image, type, position, isActive } = body

      const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      let slug = baseSlug
      let counter = 1
      while (await prisma.category.findUnique({ where: { slug } })) {
         slug = `${baseSlug}-${counter}`
         counter++
      }

      const category = await prisma.category.create({
         data: {
            name,
            slug,
            description: description || '',
            image: image || '',
            type: type || 'STANDARD',
            position: position ? parseInt(position) : 0,
            isActive: isActive ?? true,
         },
      })
      return NextResponse.json(category)
   } catch (error) {
      console.error('[CATEGORIES_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
