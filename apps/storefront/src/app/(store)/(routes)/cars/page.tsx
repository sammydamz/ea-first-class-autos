import prisma from '@/lib/prisma'
import { CarGrid, CarSkeletonGrid } from '@/components/native/CarCard'
import { Separator } from '@/components/native/separator'
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
   const minPrice = typeof searchParams.minPrice === 'string' ? Number(searchParams.minPrice) : undefined
   const maxPrice = typeof searchParams.maxPrice === 'string' ? Number(searchParams.maxPrice) : undefined
   const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest'

   const brands = await prisma.brand.findMany({ orderBy: { title: 'asc' } })

   const where = {
      isDeleted: false,
      isAvailable: true,
      ...(brandId && { brandId }),
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
         include: { brand: true },
         orderBy,
         skip: (page - 1) * PAGE_SIZE,
         take: PAGE_SIZE,
      }),
      prisma.car.count({ where }),
   ])

   const totalPages = Math.ceil(total / PAGE_SIZE)

   return (
      <div className="flex flex-col">
         {/* Hero Section */}
         <section className="pt-24 pb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
               Inventory
            </p>
             <h1 className="text-display font-bold">
                All Cars
             </h1>
             <p className="mt-6 text-subtitle text-muted-foreground max-w-2xl mx-auto">
               Browse our complete inventory of quality vehicles.
            </p>
         </section>

         {/* Filter + Cars */}
         <section className="pb-24">
            <div className="max-w-7xl mx-auto">
               <CarsFilter brands={brands} />
               {isVariableValid(cars) ? (
                  <CarGrid cars={cars} />
               ) : (
                  <CarSkeletonGrid />
               )}
               {totalPages > 1 && (
                  <Pagination page={page} totalPages={totalPages} />
               )}
            </div>
         </section>
      </div>
   )
}
