import prisma from '@/lib/prisma'
import Carousel from '@/components/native/Carousel'
import { CarGrid, CarSkeletonGrid } from '@/components/native/CarCard'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'
import { isVariableValid } from '@/lib/utils'
import { HomepageFilter } from './components/homepage-filter'
import { HomepagePagination } from './components/homepage-pagination'

const PAGE_SIZE = 12

export default async function Index(props: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
   const searchParams = await props.searchParams
   const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
   const brandId = typeof searchParams.brand === 'string' ? searchParams.brand : undefined
   const minPrice = typeof searchParams.minPrice === 'string' ? Number(searchParams.minPrice) : undefined
   const maxPrice = typeof searchParams.maxPrice === 'string' ? Number(searchParams.maxPrice) : undefined
   const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest'

   const [brands, banners] = await Promise.all([
      prisma.brand.findMany({ orderBy: { title: 'asc' } }),
      prisma.banner.findMany({ take: 5 }),
   ])

   const where = {
      isDeleted: false,
      isAvailable: true,
      ...(brandId && { brandId }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { lte: maxPrice } }),
   }

   const orderBy =
      sort === 'price-low'
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
   const bannerImages = banners.length > 0 ? banners.map((b) => b.image) : []

   return (
      <div className="flex flex-col pb-8">
         {bannerImages.length > 0 ? (
            <Carousel images={bannerImages} className="h-64 md:h-96" />
         ) : (
            <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
               <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">EA First Class Autos</h1>
                  <p className="text-lg md:text-xl opacity-90">Premium vehicles at competitive prices</p>
               </div>
            </div>
         )}
         <Separator className="my-8" />
         <Heading
            title="Our Cars"
            description="Browse our selection of quality vehicles."
         />
         <HomepageFilter brands={brands} />
         {isVariableValid(cars) && cars.length > 0 ? (
            <CarGrid cars={cars} />
         ) : (
            <CarSkeletonGrid />
         )}
         {totalPages > 1 && (
            <HomepagePagination page={page} totalPages={totalPages} />
         )}
      </div>
   )
}
