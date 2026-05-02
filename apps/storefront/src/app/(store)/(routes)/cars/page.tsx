import prisma from '@/lib/prisma'
import { CarGrid, CarSkeletonGrid } from '@/components/native/CarCard'
import { Heading } from '@/components/native/heading'
import { isVariableValid } from '@/lib/utils'
import { CarsFilter } from './components/filter'
import { Pagination } from '@/components/native/pagination'

const PAGE_SIZE = 12

export default async function CarsPage(props: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
   const searchParams = await props.searchParams
   const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
   const brandId = typeof searchParams.brand === 'string' ? searchParams.brand : undefined
   const categoryId = typeof searchParams.category === 'string' ? searchParams.category : undefined
   const minPrice = typeof searchParams.minPrice === 'string' ? Number(searchParams.minPrice) : undefined
   const maxPrice = typeof searchParams.maxPrice === 'string' ? Number(searchParams.maxPrice) : undefined
   const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest'

   const [brands, categories] = await Promise.all([
      prisma.brand.findMany({ orderBy: { title: 'asc' } }),
      prisma.category.findMany({ orderBy: { title: 'asc' } }),
   ])

   const where = {
      isDeleted: false,
      isAvailable: true,
      ...(brandId && { brandId }),
      ...(categoryId && { categories: { some: { id: categoryId } } }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { lte: maxPrice } }),
   }

   const orderBy = sort === 'price-low'
      ? { price: 'asc' as const }
      : sort === 'price-high'
         ? { price: 'desc' as const }
         : { createdAt: 'desc' as const }

   const [cars, total] = await Promise.all([
      prisma.car.findMany({
         where,
         include: { brand: true, categories: true },
         orderBy,
         skip: (page - 1) * PAGE_SIZE,
         take: PAGE_SIZE,
      }),
      prisma.car.count({ where }),
   ])

   const totalPages = Math.ceil(total / PAGE_SIZE)

   return (
      <div className="container mx-auto px-4 py-8">
         <Heading title="All Cars" description="Browse our complete inventory." />
         <CarsFilter brands={brands} categories={categories} />
         {isVariableValid(cars) ? (
            <CarGrid cars={cars} />
         ) : (
            <CarSkeletonGrid />
         )}
         {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} />
         )}
      </div>
   )
}