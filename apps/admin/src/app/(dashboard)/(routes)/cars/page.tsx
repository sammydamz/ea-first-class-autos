import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { formatter } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { CarsTable } from './components/table'
import { CarColumn } from './components/table'

export default async function CarsPage() {
   const cars = await prisma.car.findMany({
      include: {
         brand: true,
      },
      orderBy: {
         createdAt: 'desc',
      },
      where: {
         isDeleted: false,
      },
   })

   const formattedCars: CarColumn[] = cars.map((car) => ({
      id: car.id,
      title: car.title,
      price: formatter.format(car.price),
      brand: car.brand.title,
      condition: car.condition,
      isAvailable: car.isAvailable,
      image: car.images?.[0] || null,
   }))

   return (
      <div className="block space-y-4 my-6">
         <div className="flex items-center justify-between">
            <Heading
               title={`Cars (${cars.length})`}
               description="Manage cars in your inventory"
            />
            <Link href="/cars/new">
               <Button>
                  <Plus className="mr-2 h-4" /> Add New
               </Button>
            </Link>
         </div>
         <Separator />
         {cars.length > 0 ? (
            <CarsTable data={formattedCars} />
         ) : (
            <div className="text-center py-10 text-neutral-500">
               No cars yet. Add your first car to get started.
            </div>
         )}
      </div>
   )
}