import Carousel from '@/components/native/Carousel'
import { CarGrid } from '@/components/native/CarCard'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'

const mockCars = [
   {
      id: '1',
      title: 'Toyota Camry 2022',
      slug: 'toyota-camry-2022',
      model: 'Camry',
      year: 2022,
      price: 25000,
      isNegotiable: true,
      condition: 'Used',
      description: 'Well maintained sedan with low mileage.',
      specifications: null,
       images: ['/placeholder-car.svg'],
       whatsappNumber: null,
       isAvailable: true,
       isDeleted: false,
       brandId: 'b1',
       createdAt: new Date(),
       updatedAt: new Date(),
       brand: { id: 'b1', title: 'Toyota', description: null, logo: null, createdAt: new Date(), updatedAt: new Date() },
       categories: [],
   },
   {
       id: '2',
       title: 'BMW X5 2023',
       slug: 'bmw-x5-2023',
       model: 'X5',
       year: 2023,
       price: 55000,
       isNegotiable: false,
       condition: 'New',
       description: 'Luxury SUV with premium features.',
       specifications: null,
       images: ['/placeholder-car.svg'],
       whatsappNumber: null,
       isAvailable: true,
       isDeleted: false,
       brandId: 'b2',
       createdAt: new Date(),
       updatedAt: new Date(),
       brand: { id: 'b2', title: 'BMW', description: null, logo: null, createdAt: new Date(), updatedAt: new Date() },
       categories: [],
   },
   {
       id: '3',
       title: 'Honda Civic 2021',
       slug: 'honda-civic-2021',
       model: 'Civic',
       year: 2021,
       price: 18000,
       isNegotiable: true,
       condition: 'Used',
       description: 'Reliable and fuel-efficient compact car.',
       specifications: null,
       images: ['/placeholder-car.svg'],
       whatsappNumber: null,
       isAvailable: true,
       isDeleted: false,
       brandId: 'b3',
       createdAt: new Date(),
       updatedAt: new Date(),
       brand: { id: 'b3', title: 'Honda', description: null, logo: null, createdAt: new Date(), updatedAt: new Date() },
       categories: [],
   },
   {
       id: '4',
       title: 'Mercedes-Benz C-Class 2023',
       slug: 'mercedes-c-class-2023',
       model: 'C-Class',
       year: 2023,
       price: 48000,
       isNegotiable: false,
       condition: 'New',
       description: 'Elegant sedan with advanced technology.',
       specifications: null,
       images: ['/placeholder-car.svg'],
       whatsappNumber: null,
       isAvailable: true,
       isDeleted: false,
       brandId: 'b4',
       createdAt: new Date(),
       updatedAt: new Date(),
       brand: { id: 'b4', title: 'Mercedes-Benz', description: null, logo: null, createdAt: new Date(), updatedAt: new Date() },
       categories: [],
   },
   {
       id: '5',
       title: 'Ford F-150 2022',
       slug: 'ford-f150-2022',
       model: 'F-150',
       year: 2022,
       price: 35000,
       isNegotiable: true,
       condition: 'Used',
       description: 'Powerful truck ready for any job.',
       specifications: null,
       images: ['/placeholder-car.svg'],
       whatsappNumber: null,
       isAvailable: true,
       isDeleted: false,
       brandId: 'b5',
       createdAt: new Date(),
       updatedAt: new Date(),
       brand: { id: 'b5', title: 'Ford', description: null, logo: null, createdAt: new Date(), updatedAt: new Date() },
       categories: [],
   },
   {
       id: '6',
       title: 'Toyota RAV4 2023',
       slug: 'toyota-rav4-2023',
       model: 'RAV4',
       year: 2023,
       price: 32000,
       isNegotiable: true,
       condition: 'New',
       description: 'Versatile crossover SUV.',
       specifications: null,
       images: ['/placeholder-car.svg'],
       whatsappNumber: null,
       isAvailable: true,
       isDeleted: false,
       brandId: 'b1',
       createdAt: new Date(),
       updatedAt: new Date(),
       brand: { id: 'b1', title: 'Toyota', description: null, logo: null, createdAt: new Date(), updatedAt: new Date() },
       categories: [],
   },
]

const mockBanners = [
   '/placeholder-banner.jpg',
   '/placeholder-banner.jpg',
]

export default function Index() {
   return (
      <div className="flex flex-col">
         <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
            <div className="text-center text-white px-4">
               <h1 className="text-4xl md:text-5xl font-bold mb-4">EA First Class Autos</h1>
               <p className="text-lg md:text-xl opacity-90">Premium vehicles at competitive prices</p>
            </div>
         </div>
         <Separator className="my-8" />
         <Heading title="Our Cars" description="Browse our selection of quality vehicles." />
         <CarGrid cars={mockCars as any} />
      </div>
   )
}
