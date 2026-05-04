import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function PATCH(req: Request, props: { params: Promise<{ carId: string }> }) {
   const params = await props.params;
   try {
      const body = await req.json()
      const { title, model, year, price, isNegotiable, condition, description, specifications, images, whatsappNumber, isAvailable, brandId } = body

      const updateData: any = {
         model,
         year: year ? parseInt(year) : null,
         price: parseFloat(price) || 0,
         isNegotiable: isNegotiable || false,
         condition: condition || 'Local Used',
         description,
         specifications: specifications || {},
         images: images || [],
         whatsappNumber,
         isAvailable: isAvailable ?? true,
         brandId,
      }

      if (title) {
         const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
         const existing = await prisma.car.findUnique({ where: { slug: baseSlug } })
         if (!existing || existing.id === params.carId) { updateData.slug = baseSlug }
         else {
            let slug = baseSlug; let counter = 1
            while (await prisma.car.findUnique({ where: { slug } })) { slug = `${baseSlug}-${counter}`; counter++ }
            updateData.slug = slug
         }
         updateData.title = title
      }
      const car = await prisma.car.update({ where: { id: params.carId }, data: updateData })
       revalidatePath(`/cars/${car.slug}`)
       revalidatePath('/cars')
       return NextResponse.json(car)
   } catch (error) {
      console.error('[CARS_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(req: Request, props: { params: Promise<{ carId: string }> }) {
   const params = await props.params;
   try {
      if (!params.carId) { return new NextResponse('Car ID required', { status: 400 }) }

      const car = await prisma.car.findUnique({
         where: { id: params.carId },
         select: { images: true },
      })
      if (!car) { return new NextResponse('Car not found', { status: 404 }) }

      const keys = (car.images as string[])
         .map((url: string) => {
            const m = url.match(/\/f\/([^/?#]+)/)
            return m ? m[1] : null
         })
         .filter(Boolean) as string[]

      if (keys.length > 0) {
         await utapi.deleteFiles(keys).catch((err) =>
            console.error('[UT_DELETE]', err),
         )
      }

      const updated = await prisma.car.update({
         where: { id: params.carId },
         data: { isDeleted: true },
      })
      return NextResponse.json(updated)
   } catch (error) {
      console.error('[CARS_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
