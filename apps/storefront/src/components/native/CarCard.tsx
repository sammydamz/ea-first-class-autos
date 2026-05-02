import { Badge } from '@/components/ui/badge'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { CarWithIncludes } from '@/types/prisma'
import Image from 'next/image'
import Link from 'next/link'

function formatPrice(price: number): string {
   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
   }).format(price)
}

export const CarGrid = ({ cars }: { cars: CarWithIncludes[] }) => {
   return (
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
         {cars.map((car) => (
            <CarCard car={car} key={car.id} />
         ))}
      </div>
   )
}

export const CarSkeletonGrid = () => {
   return (
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
         {[...Array(12)].map(() => (
            <CarSkeleton key={Math.random()} />
         ))}
      </div>
   )
}

export const CarCard = ({ car }: { car: CarWithIncludes }) => {
   return (
      <Link href={`/cars/${car.slug}`}>
         <Card className="h-full">
            <CardHeader className="p-0">
               <div className="relative h-48 w-full overflow-hidden">
                  {car.images[0] ? (
                     <Image
                        className="rounded-t-lg object-cover"
                        src={car.images[0]}
                        alt={car.title}
                        fill
                        sizes="(min-width: 1000px) 30vw, 50vw"
                     />
                  ) : (
                     <div className="flex h-48 w-full items-center justify-center bg-neutral-200">
                        <span className="text-neutral-400">No image</span>
                     </div>
                  )}
               </div>
            </CardHeader>
            <CardContent className="grid gap-1 p-4">
               <div className="flex gap-1 flex-wrap">
                  <Badge variant="outline" className="text-neutral-500">
                     {car.brand.title}
                  </Badge>
                  {car.condition && (
                     <Badge variant="secondary">{car.condition}</Badge>
                  )}
               </div>

               <CardTitle className="line-clamp-2 mt-2 text-lg">
                  {car.title}
               </CardTitle>
               {car.year && (
                  <CardDescription>{car.year}</CardDescription>
               )}
            </CardContent>
            <CardFooter>
               {car.isAvailable ? (
                  <div className="text-lg font-semibold text-rose-600">
                     {formatPrice(car.price)}
                     {car.isNegotiable && (
                        <span className="ml-2 text-sm font-normal text-neutral-500">
                           Negotiable
                        </span>
                     )}
                  </div>
               ) : (
                  <Badge variant="secondary">Sold</Badge>
               )}
            </CardFooter>
         </Card>
      </Link>
   )
}

export function CarSkeleton() {
   return (
      <Link href="#">
         <div className="animate-pulse rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex h-48 w-full items-center justify-center rounded bg-neutral-300 dark:bg-neutral-700">
               <span className="text-neutral-400">Loading...</span>
            </div>
            <div className="p-4">
               <div className="mt-2 h-4 w-3/4 rounded bg-neutral-300 dark:bg-neutral-700" />
               <div className="mt-2 h-4 w-1/2 rounded bg-neutral-300 dark:bg-neutral-700" />
            </div>
         </div>
      </Link>
   )
}