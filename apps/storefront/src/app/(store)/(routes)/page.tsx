import prisma from '@/lib/prisma'
import { CarGrid, CarSkeletonGrid } from '@/components/native/CarCard'
import { Separator } from '@/components/native/separator'
import { isVariableValid } from '@/lib/utils'
import { HomepageFilter } from './components/homepage-filter'
import { HomepagePagination } from './components/homepage-pagination'
import Image from 'next/image'

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
      <div className="flex flex-col">
         {/* Hero Section */}
         {bannerImages.length > 0 ? (
             <section className="relative h-[50vh] sm:h-[60vh] md:h-[75vh] w-full overflow-hidden">
                 <Image
                    src={bannerImages[0]}
                    alt="Featured vehicles"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                 />
               <div className="absolute inset-0 bg-black/40" />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                   <h1 className="text-display font-bold">
                      EA First Class Autos
                   </h1>
                   <p className="mt-6 text-subtitle opacity-90 max-w-2xl">
                      Quality you can trust. Service you can feel.
                   </p>
                </div>
             </section>
          ) : (
              <section className="relative h-[50vh] sm:h-[60vh] md:h-[75vh] w-full bg-primary flex items-center justify-center">
                <div className="text-center text-white px-4">
                   <h1 className="text-display font-bold">
                      EA First Class Autos
                   </h1>
                   <p className="mt-6 text-subtitle opacity-90 max-w-2xl">
                      Quality you can trust. Service you can feel.
                   </p>
               </div>
            </section>
         )}

         {/* Cars Section */}
         <section className="py-24">
             <div className="max-w-7xl mx-auto">
               <div className="text-center mb-16">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                     Our Collection
                  </p>
                   <h2 className="text-heading font-bold">
                      Browse Our Selection
                   </h2>
                   <p className="mt-4 text-subtitle text-muted-foreground max-w-2xl mx-auto">
                     Every vehicle handpicked for quality, reliability, and value.
                  </p>
               </div>
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
         </section>
      </div>
   )
}
