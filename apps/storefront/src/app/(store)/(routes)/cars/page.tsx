import prisma from '@/lib/prisma'
import { CarGrid, CarSkeletonGrid } from '@/components/native/CarCard'
import { Heading } from '@/components/native/heading'
import { isVariableValid } from '@/lib/utils'

export default async function CarsPage() {
   const cars = await prisma.car.findMany({
      where: {
         isDeleted: false,
         isAvailable: true,
      },
      include: {
         brand: true,
         categories: true,
      },
      orderBy: {
         createdAt: 'desc',
      },
   })

   return (
      <div className="container mx-auto px-4 py-8">
         <Heading
            title="All Cars"
            description="Browse our complete inventory."
         />
         {isVariableValid(cars) ? (
            <CarGrid cars={cars} />
         ) : (
            <CarSkeletonGrid />
         )}
      </div>
   )
}