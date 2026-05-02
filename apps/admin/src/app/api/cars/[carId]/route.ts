import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
   try {
      const body = await req.json()
      const { title, model, year, price, isNegotiable, condition, description, specifications, images, whatsappNumber, isAvailable, brandId } = body

      // Extract carId from URL
      const url = new URL(req.url)
      const carId = url.pathname.split('/').pop()

      if (!carId) {
         return new NextResponse('Car ID required', { status: 400 })
      }

      const updateData: any = {
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
      }

      // Update slug if title changed
      if (title) {
         const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
         const existing = await prisma.car.findUnique({ where: { slug: baseSlug } })
         if (!existing || existing.id === carId) {
            updateData.slug = baseSlug
         } else {
            let slug = baseSlug
            let counter = 1
            while (await prisma.car.findUnique({ where: { slug } })) {
               slug = `${baseSlug}-${counter}`
               counter++
            }
            updateData.slug = slug
         }
         updateData.title = title
      }

      const car = await prisma.car.update({
         where: { id: carId },
         data: updateData,
      })

      return NextResponse.json(car)
   } catch (error) {
      console.error('[CARS_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}