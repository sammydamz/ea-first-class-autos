import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
   const [total, available, sold] = await Promise.all([
      prisma.car.count({ where: { isDeleted: false } }),
      prisma.car.count({ where: { isDeleted: false, isAvailable: true } }),
      prisma.car.count({ where: { isDeleted: false, isAvailable: false } }),
   ])

   return NextResponse.json({ total, available, sold })
}