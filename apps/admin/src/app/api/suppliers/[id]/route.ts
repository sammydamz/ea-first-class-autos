import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
   const params = await props.params
   try {
      const supplier = await prisma.supplier.findUnique({
         where: { id: params.id },
         include: { _count: { select: { products: true } } },
      })
      if (!supplier) return new NextResponse('Supplier not found', { status: 404 })
      return NextResponse.json(supplier)
   } catch (error) {
      console.error('[SUPPLIER_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
   const params = await props.params
   try {
      const body = await req.json()
      const { name, phone, email, address } = body

      const supplier = await prisma.supplier.update({
         where: { id: params.id },
         data: { name, phone, email, address },
      })
      revalidatePath('/suppliers')
      return NextResponse.json(supplier)
   } catch (error) {
      console.error('[SUPPLIER_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
   const params = await props.params
   try {
      if (!params.id) return new NextResponse('Supplier ID required', { status: 400 })

      const supplier = await prisma.supplier.findUnique({ where: { id: params.id } })
      if (!supplier) return new NextResponse('Supplier not found', { status: 404 })

      await prisma.supplier.delete({ where: { id: params.id } })
      revalidatePath('/suppliers')
      return NextResponse.json({ success: true })
   } catch (error) {
      console.error('[SUPPLIER_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
