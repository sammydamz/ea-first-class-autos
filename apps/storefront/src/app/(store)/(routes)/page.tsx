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
           <section className="md:hidden relative h-[50vh] w-screen -mx-[clamp(0.75rem,3vw,2rem)] overflow-hidden">
               <Image
                  src="https://jf8vtp06y9.ufs.sh/f/EXKUfm9UzRWTiYQLJAcIe9lv7BfFdjYhW8gVyswQGXJ1ME6A"
                  alt="E.A. First Class Autos"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
               />
               <div className="absolute inset-0 bg-black/40" />
            </section>
            <section className="hidden md:block relative h-[50vh] sm:h-[60vh] md:h-[75vh] w-screen -mx-[clamp(0.75rem,3vw,2rem)] md:-mx-[4rem] lg:-mx-[6rem] xl:-mx-[8rem] 2xl:-mx-[12rem] overflow-hidden">
               <Image
                  src="https://jf8vtp06y9.ufs.sh/f/EXKUfm9UzRWTyMHTIHGhuSUdMZINDJCEPso9gznXBQHm4OGA"
                  alt="E.A. First Class Autos"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
               />
               <div className="absolute inset-0 bg-black/40" />
            </section>

         {/* Cars Section */}
         <section className="py-24">
             <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                   <h2 className="text-heading font-bold">
                      Browse Our Collection
                   </h2>
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
