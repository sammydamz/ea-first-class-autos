import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
   const params = await props.params
   try {
      const category = await prisma.category.findUnique({
         where: { id: params.id },
         include: { _count: { select: { products: true } } },
      })
      if (!category) return new NextResponse('Category not found', { status: 404 })
      return NextResponse.json(category)
   } catch (error) {
      console.error('[CATEGORY_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
   const params = await props.params
   try {
      const body = await req.json()
      const { name, description, image, type, position, isActive } = body

      const updateData: any = {
         description: description,
         image: image,
         type: type,
         position: position ? parseInt(position) : undefined,
         isActive: isActive,
      }

      if (name) {
         const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
         const existing = await prisma.category.findUnique({ where: { slug: baseSlug } })
         if (!existing || existing.id === params.id) updateData.slug = baseSlug
         else {
            let slug = baseSlug; let counter = 1
            while (await prisma.category.findUnique({ where: { slug } })) { slug = `${baseSlug}-${counter}`; counter++ }
            updateData.slug = slug
         }
         updateData.name = name
      }

      const category = await prisma.category.update({ where: { id: params.id }, data: updateData })
      revalidatePath('/categories')
      revalidatePath(`/categories/${category.slug}`)
      return NextResponse.json(category)
   } catch (error) {
      console.error('[CATEGORY_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
   const params = await props.params
   try {
      if (!params.id) return new NextResponse('Category ID required', { status: 400 })

      const category = await prisma.category.findUnique({
         where: { id: params.id },
         select: { image: true },
      })
      if (!category) return new NextResponse('Category not found', { status: 404 })

      if (category.image) {
         const m = category.image.match(/\/f\/([^/?#]+)/)
         if (m) await utapi.deleteFiles(m[1]).catch((err) => console.error('[UT_DELETE]', err))
      }

      await prisma.category.delete({ where: { id: params.id } })
      revalidatePath('/categories')
      return NextResponse.json({ success: true })
   } catch (error) {
      console.error('[CATEGORY_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
