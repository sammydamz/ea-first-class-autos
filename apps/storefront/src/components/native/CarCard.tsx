import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { CarWithIncludes } from '@/types/prisma'
import { MessageCircle } from 'lucide-react'
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
      <Card className="h-full flex flex-col">
         <Link href={`/cars/${car.slug}`}>
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
                     <div className="flex h-48 w-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No image</span>
                     </div>
                  )}
               </div>
            </CardHeader>
         </Link>
         <CardContent className="grid gap-1 p-4 flex-1">
            <div className="flex gap-1 flex-wrap">
               <Badge variant="outline" className="text-muted-foreground">
                  {car.brand.title}
               </Badge>
               {car.condition && (
                  <Badge variant="secondary">{car.condition}</Badge>
               )}
            </div>

            <Link href={`/cars/${car.slug}`}>
               <CardTitle className="line-clamp-2 mt-2 text-lg hover:text-primary transition-colors">
                  {car.title}
               </CardTitle>
            </Link>
            {car.year && (
               <CardDescription>{car.year}</CardDescription>
            )}
         </CardContent>
         <CardFooter className="flex items-center justify-between p-4 pt-0">
             {car.isAvailable ? (
                <div className="text-lg font-semibold text-primary">
                   {formatPrice(car.price)}
                </div>
            ) : (
               <Badge variant="secondary">Sold</Badge>
            )}
            {car.isAvailable && (
               <Button size="sm" className="gap-1" asChild>
                  <a
                     href={`https://wa.me/?text=${encodeURIComponent(`Hi, I'm interested in the ${car.title} listed at ${formatPrice(car.price)}`)}`}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <MessageCircle className="h-4 w-4" />
                     Contact
                  </a>
               </Button>
            )}
         </CardFooter>
      </Card>
   )
}

export function CarSkeleton() {
   return (
      <Link href="#">
         <div className="animate-pulse rounded-lg border bg-card">
            <div className="flex h-48 w-full items-center justify-center rounded bg-muted">
               <span className="text-muted-foreground">Loading...</span>
            </div>
            <div className="p-4">
               <div className="mt-2 h-4 w-3/4 rounded bg-muted" />
               <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
            </div>
         </div>
      </Link>
   )
}
