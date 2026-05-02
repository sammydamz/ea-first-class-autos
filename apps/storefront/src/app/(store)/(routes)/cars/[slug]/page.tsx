import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { isVariableValid } from '@/lib/utils'
import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Props = {
   params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const params = await props.params
   const car = await prisma.car.findUnique({
      where: { slug: params.slug },
   })

   if (!car) return {}

   return {
      title: car.title,
      description: car.description || undefined,
   }
}

export default async function CarPage(props: { params: Promise<{ slug: string }> }) {
   const params = await props.params
   const car = await prisma.car.findUnique({
      where: { slug: params.slug },
      include: {
         brand: true,
         categories: true,
      },
   })

   if (!isVariableValid(car)) {
      notFound()
   }

   const siteConfig = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })

   const whatsappNumber = car.whatsappNumber || siteConfig?.defaultWhatsApp || ''
   const pageUrl = `https://eaautos.com/cars/${car.slug}`

   let whatsappUrl = ''
   if (whatsappNumber) {
      const specsText = Object.entries(car.specifications as Record<string, string> || {})
         .map(([key, value]) => `${key}: ${value}`)
         .join('\n')

      const message = `Hi, I'm interested in "${car.title}" (${car.year} ${car.brand.title} ${car.model}).
Price: $${car.price.toLocaleString()}${car.isNegotiable ? ' Negotiable' : ''}
Condition: ${car.condition}
${specsText ? `\nSpecifications:\n${specsText}` : ''}
Link: ${pageUrl}`

      whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <Breadcrumbs car={car} />
         <Separator className="my-6" />
         <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <ImageGallery car={car} />
            <CarDetails car={car} whatsappUrl={whatsappUrl} />
         </div>
         {car.description && (
            <>
               <Separator className="my-8" />
               <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="whitespace-pre-wrap">{car.description}</p>
               </div>
            </>
         )}
      </div>
   )
}

function Breadcrumbs({ car }: { car: any }) {
   return (
      <nav className="flex text-sm text-muted-foreground" aria-label="Breadcrumb">
         <ol className="inline-flex items-center gap-2">
            <li>
               <Link href="/" className="hover:text-foreground">Home</Link>
            </li>
            <li>/</li>
            <li>
               <Link href="/" className="hover:text-foreground">Cars</Link>
            </li>
            <li>/</li>
            <li className="font-medium text-foreground">{car.title}</li>
         </ol>
      </nav>
   )
}

function ImageGallery({ car }: { car: any }) {
   return (
      <div className="lg:col-span-2">
         <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100">
            {car.images[0] ? (
               <img
                  src={car.images[0]}
                  alt={car.title}
                  className="w-full h-full object-cover"
               />
            ) : (
               <div className="flex items-center justify-center h-full text-neutral-400">
                  No image available
               </div>
            )}
         </div>
         {car.images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto">
               {car.images.map((img: string, i: number) => (
                  <div key={i} className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-neutral-100">
                     <img src={img} alt={`${car.title} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

function CarDetails({ car, whatsappUrl }: { car: any; whatsappUrl: string }) {
   const formatPrice = (price: number) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)

   return (
      <div className="space-y-6">
         <div>
            <div className="flex gap-2 flex-wrap mb-2">
               <Badge variant="outline">{car.brand.title}</Badge>
               <Badge variant="secondary">{car.condition}</Badge>
               {car.year && <Badge variant="secondary">{car.year}</Badge>}
            </div>
            <h1 className="text-2xl font-bold">{car.title}</h1>
            <p className="text-lg font-semibold text-rose-600 mt-2">
               {formatPrice(car.price)}
               {car.isNegotiable && <span className="ml-2 text-sm font-normal text-neutral-500">Negotiable</span>}
            </p>
         </div>

         {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
               <Button className="w-full bg-rose-600 hover:bg-rose-700">
                  Enquire on WhatsApp
               </Button>
            </a>
         )}

         <Separator />

         <div>
            <h2 className="font-semibold mb-3">Specifications</h2>
            {car.model && (
               <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-neutral-500">Model</span>
                  <span>{car.model}</span>
               </div>
            )}
            {car.year && (
               <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-neutral-500">Year</span>
                  <span>{car.year}</span>
               </div>
            )}
            {car.specifications && Object.entries(car.specifications).map(([key, value]) => (
               <div key={key} className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-neutral-500">{key}</span>
                  <span>{value as string}</span>
               </div>
            ))}
         </div>
      </div>
   )
}