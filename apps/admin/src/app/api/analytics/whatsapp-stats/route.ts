import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const totalClicks = await prisma.whatsappClick.count()

    const cardClicks = await prisma.whatsappClick.count({
      where: { source: 'card' },
    })

    const detailClicks = await prisma.whatsappClick.count({
      where: { source: 'detail' },
    })

    const carStats = await prisma.whatsappClick.groupBy({
      by: ['carId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    })

    const carIds = carStats.map((s) => s.carId)
    const cars = await prisma.car.findMany({
      where: { id: { in: carIds } },
      select: { id: true, title: true, slug: true, images: true },
    })

    const carMap = new Map(cars.map((c) => [c.id, c]))

    const perCar = carStats.map((stat) => {
      const car = carMap.get(stat.carId)
      return {
        carId: stat.carId,
        carTitle: car?.title ?? 'Unknown',
        carSlug: car?.slug ?? '',
        carImage: car?.images?.[0] ?? null,
        clicks: stat._count.id,
      }
    })

    return NextResponse.json({
      totalClicks,
      cardClicks,
      detailClicks,
      perCar,
    })
  } catch (error) {
    console.error('[WHATSAPP_STATS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
