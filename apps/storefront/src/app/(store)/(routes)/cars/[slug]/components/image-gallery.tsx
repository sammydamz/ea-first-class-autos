'use client'

import Image from 'next/image'
import { useState } from 'react'

type ImageGalleryProps = {
   images: string[]
   title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
   const [selectedIndex, setSelectedIndex] = useState(0)

   if (!images || images.length === 0) {
      return (
         <div className="lg:col-span-2">
            <div className="flex h-80 items-center justify-center rounded-lg bg-muted">
               <span className="text-muted-foreground">No image available</span>
            </div>
         </div>
      )
   }

   return (
      <div className="lg:col-span-2">
         <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <Image
               src={images[selectedIndex]}
               alt={`${title} - image ${selectedIndex + 1}`}
               fill
               sizes="(max-width: 1024px) 100vw, 66vw"
               className="object-cover"
               priority
            />
         </div>
         {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
               {images.map((img, i) => (
                  <button
                     key={i}
                     onClick={() => setSelectedIndex(i)}
                     className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
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
