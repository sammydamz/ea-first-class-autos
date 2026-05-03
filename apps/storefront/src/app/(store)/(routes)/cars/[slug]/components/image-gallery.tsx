'use client'

import Image from 'next/image'
import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

type ImageGalleryProps = {
   images: string[]
   title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
   const [selectedIndex, setSelectedIndex] = useState(0)
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

   if (!images || images.length === 0) {
      return (
         <div className="lg:col-span-2">
            <div className="flex h-80 items-center justify-center rounded-lg bg-muted">
               <span className="text-muted-foreground">No image available</span>
            </div>
         </div>
      )
   }

   const onSelect = () => {
      if (!emblaApi) return
      setSelectedIndex(emblaApi.selectedScrollSnap())
   }

   if (emblaApi) {
      emblaApi.on('select', onSelect)
   }

   return (
      <div className="lg:col-span-2">
         <div className="overflow-hidden rounded-lg bg-muted" ref={emblaRef}>
            <div className="flex">
               {images.map((img, i) => (
                  <div key={i} className="relative aspect-video min-w-0 flex-[0_0_100%]">
                     <Image
                        src={img}
                        alt={`${title} - image ${i + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover"
                        priority={i === 0}
                     />
                  </div>
               ))}
            </div>
         </div>
         {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
               {images.map((img, i) => (
                  <button
                     key={i}
                     type="button"
                     onClick={() => {
                        if (emblaApi) emblaApi.scrollTo(i)
                     }}
                     className={`relative h-16 w-24 flex-shrink-0 snap-start overflow-hidden rounded-md border-2 transition-colors ${
                        i === selectedIndex
                           ? 'border-primary'
                           : 'border-transparent hover:border-muted-foreground/30'
                     }`}
                  >
                     <Image
                        src={img}
                        alt={`${title} thumbnail ${i + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                     />
                  </button>
               ))}
            </div>
         )}
      </div>
   )
}
