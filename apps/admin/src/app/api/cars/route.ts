import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const cars = await prisma.car.findMany({
         include: { brand: true, categories: true },
         orderBy: { createdAt: 'desc' },
      })
      return NextResponse.json(cars)
   } catch (error) {
      console.error('[CARS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const { title, model, year, price, isNegotiable, condition, description, specifications, images, whatsappNumber, isAvailable, brandId } = body

      // Simple slug generation
      const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      let slug = baseSlug
      let counter = 1
      while (await prisma.car.findUnique({ where: { slug } })) {
         slug = `${baseSlug}-${counter}`
         counter++
      }

      const car = await prisma.car.create({
         data: {
            title,
            slug,
            model,
            year: year ? parseInt(year) : null,
            price: parseFloat(price) || 0,
            isNegotiable: isNegotiable || false,
            condition: condition || 'Used',
            description,
            specifications: specifications || {},
            images: images || [],
            whatsappNumber,
            isAvailable: isAvailable ?? true,
            brandId,
         },
      })

      return NextResponse.json(car)
   } catch (error) {
      console.error('[CARS_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}