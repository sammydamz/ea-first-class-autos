import { Suspense } from 'react'
import prisma from '@/lib/prisma'
import { CarGrid, CarSkeletonGrid } from '@/components/native/CarCard'
import { Heading } from '@/components/native/heading'
import { isVariableValid } from '@/lib/utils'
import { CarsFilter } from './components/filter'

export default async function CarsPage(props: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
   const searchParams = await props.searchParams
   const brandId = typeof searchParams.brand === 'string' ? searchParams.brand : undefined
   const categoryId = typeof searchParams.category === 'string' ? searchParams.category : undefined
   const minPrice = typeof searchParams.minPrice === 'string' ? Number(searchParams.minPrice) : undefined
   const maxPrice = typeof searchParams.maxPrice === 'string' ? Number(searchParams.maxPrice) : undefined
   const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest'

   const where = {
      isDeleted: false,
      isAvailable: true,
      ...(brandId && { brandId }),
      ...(categoryId && {
         categories: { some: { id: categoryId } }
      }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { lte: maxPrice } }),
   }

   const orderBy = sort === 'price-low'
      ? { price: 'asc' }
      : sort === 'price-high'
         ? { price: 'desc' }
         : { createdAt: 'desc' }

   const [cars, brands, categories] = await Promise.all([
      prisma.car.findMany({
         where,
         include: { brand: true, categories: true },
         orderBy,
      }),
      prisma.brand.findMany({ orderBy: { title: 'asc' } }),
      prisma.category.findMany({ orderBy: { title: 'asc' } }),
   ])

   return (
      <div className="container mx-auto px-4 py-8">
         <Heading title="All Cars" description="Browse our complete inventory." />
         <CarsFilter brands={brands} categories={categories} />
         {isVariableValid(cars) ? (
            <CarGrid cars={cars} />
         ) : (
            <CarSkeletonGrid />
         )}
      </div>
   )
}