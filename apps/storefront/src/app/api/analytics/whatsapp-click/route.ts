import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { carId, source } = body

    if (!carId || !source) {
      return NextResponse.json(
        { error: 'carId and source are required' },
        { status: 400 }
      )
    }

    if (!['card', 'detail'].includes(source)) {
      return NextResponse.json(
        { error: 'source must be "card" or "detail"' },
        { status: 400 }
      )
    }

    const car = await prisma.car.findUnique({ where: { id: carId } })
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 })
    }

    const click = await prisma.whatsappClick.create({
      data: { carId, source },
    })

    return NextResponse.json(click, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
