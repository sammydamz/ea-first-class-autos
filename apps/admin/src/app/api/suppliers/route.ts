import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const suppliers = await prisma.supplier.findMany({
         include: { _count: { select: { products: true } } },
         orderBy: { createdAt: 'desc' },
      })
      return NextResponse.json(suppliers)
   } catch (error) {
      console.error('[SUPPLIERS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const { name, phone, email, address } = body

      const supplier = await prisma.supplier.create({
         data: {
            name,
            phone: phone || '',
            email: email || '',
            address: address || '',
         },
      })
      return NextResponse.json(supplier)
   } catch (error) {
      console.error('[SUPPLIERS_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
