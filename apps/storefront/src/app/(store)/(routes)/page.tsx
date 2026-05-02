import prisma from '@/lib/prisma'
import { Carousel } from '@/components/native/Carousel'
import { CarGrid, CarSkeletonGrid } from '@/components/native/CarCard'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'
import { isVariableValid } from '@/lib/utils'
import { CarsFilter } from './cars/components/filter'

export default async function Index() {
   const [cars, brands, categories, banners] = await Promise.all([
      prisma.car.findMany({
         where: { isDeleted: false, isAvailable: true },
         include: { brand: true, categories: true },
         orderBy: { createdAt: 'desc' },
         take: 12,
      }),
      prisma.brand.findMany({ orderBy: { title: 'asc' } }),
      prisma.category.findMany({ orderBy: { title: 'asc' } }),
      prisma.banner.findMany(),
   ])

   return (
      <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
         <Carousel images={banners.map((b) => b.image)} className="h-64 md:h-96" />
         <Separator className="my-8" />
         <Heading title="Our Cars" description="Browse our selection of quality vehicles." />
         {isVariableValid(cars) ? (
            <CarGrid cars={cars} />
         ) : (
            <CarSkeletonGrid />
         )}
      </div>
   )
}