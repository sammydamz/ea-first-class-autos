import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')
    const sourceParam = searchParams.get('source')

    const dateFilter: { gte?: Date; lte?: Date } = {}
    if (fromParam) dateFilter.gte = new Date(fromParam)
    if (toParam) {
      const to = new Date(toParam)
      to.setHours(23, 59, 59, 999)
      dateFilter.lte = to
    }

    const sourceFilter = sourceParam && sourceParam !== 'all'
      ? { source: sourceParam }
      : {}

    const where = {
      ...(Object.keys(dateFilter).length > 0
        ? { createdAt: dateFilter }
        : {}),
      ...sourceFilter,
    }

    const totalClicks = await prisma.whatsappClick.count({ where })

    const cardClicks = await prisma.whatsappClick.count({
      where: { ...where, source: 'card' },
    })

    const detailClicks = await prisma.whatsappClick.count({
      where: { ...where, source: 'detail' },
    })

    const carStats = await prisma.whatsappClick.groupBy({
      by: ['carId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      where,
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

    const dailyClicks = await prisma.whatsappClick.groupBy({
      by: ['createdAt'],
      _count: { id: true },
      orderBy: { createdAt: 'asc' },
      where,
    })

    const dailyMap = new Map<string, number>()
    for (const d of dailyClicks) {
      const day = d.createdAt.toISOString().slice(0, 10)
      dailyMap.set(day, (dailyMap.get(day) ?? 0) + d._count.id)
    }

    const daily = Array.from(dailyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, clicks]) => ({ date, clicks }))

    return NextResponse.json({
      totalClicks,
      cardClicks,
      detailClicks,
      perCar,
      daily,
    })
  } catch (error) {
    console.error('[WHATSAPP_STATS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
