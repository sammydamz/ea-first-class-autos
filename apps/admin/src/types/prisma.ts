import { Prisma } from '@prisma/client'

export type CarWithIncludes = Prisma.CarGetPayload<{
   include: {
      brand: true
   }
}>
