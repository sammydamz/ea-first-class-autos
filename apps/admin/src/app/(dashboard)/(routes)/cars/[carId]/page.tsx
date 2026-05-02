import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { CarForm } from './components/car-form'

interface Props {
   params: Promise<{ carId: string }>
}

export default async function CarPage(props: Props) {
   const params = await props.params
   const carId = params.carId

   const [car, brands, categories] = await Promise.all([
      carId === 'new'
         ? null
         : prisma.car.findUnique({
              where: { id: carId },
              include: { brand: true, categories: true },
           }),
      prisma.brand.findMany({ orderBy: { title: 'asc' } }),
      prisma.category.findMany({ orderBy: { title: 'asc' } }),
   ])

   if (carId !== 'new' && !car) {
      notFound()
   }

   return (
      <div className="container mx-auto py-6">
         <Heading title={car ? 'Edit Car' : 'Add Car'} description={car ? 'Edit car details' : 'Add a new car to inventory'} />
         <Separator className="my-6" />
         <CarForm brands={brands} categories={categories} initialData={car} />
      </div>
   )
}