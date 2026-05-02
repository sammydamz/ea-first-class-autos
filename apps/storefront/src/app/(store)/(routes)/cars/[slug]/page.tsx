import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CarWithIncludes } from '@/types/prisma'
import { ImageGallery } from './components/image-gallery'

type Props = {
   params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
   const cars = await prisma.car.findMany({
      where: { isDeleted: false, isAvailable: true },
      select: { slug: true },
   })
   return cars.map((car) => ({ slug: car.slug }))
}

export async function generateMetadata(
   props: Props,
   parent: ResolvingMetadata
): Promise<Metadata> {
   const params = await props.params
   const car = await prisma.car.findUnique({
      where: { slug: params.slug },
      include: { brand: true },
   })

   if (!car) return {}

   const title = `${car.title} - ${car.year || ''} ${car.brand.title} | EA First Class Autos`
   const description = car.description
      ? car.description.slice(0, 160)
      : `${car.title} - ${car.condition} vehicle priced at $${car.price.toLocaleString()}. Contact us on WhatsApp for more information.`

   return {
      title,
      description,
      openGraph: {
         title: car.title,
         description,
         images: car.images[0] ? [car.images[0]] : [],
         type: 'website',
      },
   }
}

export default async function CarPage(props: Props) {
   const params = await props.params
   const car = await prisma.car.findUnique({
      where: { slug: params.slug },
      include: {
         brand: true,
         categories: true,
      },
   })

   if (!car) {
      notFound()
   }

   const siteConfig = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })

   const whatsappNumber = car.whatsappNumber || siteConfig?.defaultWhatsApp || ''
   const pageUrl = `https://eaautos.com/cars/${car.slug}`

   let whatsappUrl = ''
   if (whatsappNumber) {
      const specsText = Object.entries(
         (car.specifications as Record<string, string>) || {}
      )
         .map(([key, value]) => `${key}: ${value}`)
         .join('\n')

      const message = `Hi, I'm interested in "${car.title}" (${car.year || ''} ${car.brand.title} ${car.model || ''}).
Price: $${car.price.toLocaleString()}${car.isNegotiable ? ' Negotiable' : ''}
Condition: ${car.condition}
${specsText ? `\nSpecifications:\n${specsText}` : ''}
Link: ${pageUrl}`

      whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
   }

   const hasSpecs =
      !!car.model ||
      !!car.year ||
      !!(
         car.specifications &&
         Object.keys(car.specifications as object).length > 0
      )

   return (
      <div className="container mx-auto px-4 py-8">
         <Breadcrumbs car={car} />
         <Separator className="my-6" />
         <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <ImageGallery images={car.images} title={car.title} />
            <CarDetails
               car={car}
               whatsappUrl={whatsappUrl}
               hasSpecs={hasSpecs}
            />
         </div>
         {car.description && (
            <>
               <Separator className="my-8" />
               <div>
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                     {car.description}
                  </p>
               </div>
            </>
         )}
      </div>
   )
}

function Breadcrumbs({ car }: { car: CarWithIncludes }) {
   return (
      <nav className="flex text-sm text-muted-foreground" aria-label="Breadcrumb">
         <ol className="inline-flex items-center gap-2">
            <li>
               <Link href="/" className="hover:text-foreground">
                  Home
               </Link>
            </li>
            <li>/</li>
            <li>
               <Link href="/cars" className="hover:text-foreground">
                  Cars
               </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-foreground">{car.title}</li>
         </ol>
      </nav>
   )
}

function CarDetails({
   car,
   whatsappUrl,
   hasSpecs,
}: {
   car: CarWithIncludes
   whatsappUrl: string
   hasSpecs: boolean
}) {
   const formatPrice = (price: number) =>
      new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: 'USD',
         maximumFractionDigits: 0,
      }).format(price)

   return (
      <div className="space-y-6">
         <div>
            <div className="flex gap-2 flex-wrap mb-2">
               <Badge variant="outline">{car.brand.title}</Badge>
               <Badge variant="secondary">{car.condition}</Badge>
               {car.year && <Badge variant="secondary">{car.year}</Badge>}
            </div>
            <h1 className="text-2xl font-bold">{car.title}</h1>
            <p className="text-lg font-semibold text-primary mt-2">
               {formatPrice(car.price)}
               {car.isNegotiable && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                     Negotiable
                  </span>
               )}
            </p>
         </div>

         {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
               <Button className="w-full">Enquire on WhatsApp</Button>
            </a>
         )}

         {hasSpecs && (
            <>
               <Separator />
               <div>
                  <h2 className="font-semibold mb-3">Specifications</h2>
                  <div className="space-y-2">
                     {car.model && (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                           <span className="text-muted-foreground">Model</span>
                           <span>{car.model}</span>
                        </div>
                     )}
                     {car.year && (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                           <span className="text-muted-foreground">Year</span>
                           <span>{car.year}</span>
                        </div>
                     )}
                     {car.specifications &&
                        Object.entries(car.specifications as Record<string, string>).map(
                           ([key, value]) => (
                              <div key={key} className="grid grid-cols-2 gap-2 text-sm">
                                 <span className="text-muted-foreground">{key}</span>
                                 <span>{value}</span>
                              </div>
                           )
                        )}
                  </div>
               </div>
            </>
         )}
      </div>
   )
}
