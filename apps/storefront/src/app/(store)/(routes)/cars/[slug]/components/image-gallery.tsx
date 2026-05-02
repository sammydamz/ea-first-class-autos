'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type ImageGalleryProps = {
   images: string[]
   title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
   const [selectedIndex, setSelectedIndex] = useState(0)
   const [lightboxOpen, setLightboxOpen] = useState(false)

   const openLightbox = (index: number) => {
      setSelectedIndex(index)
      setLightboxOpen(true)
   }

   const closeLightbox = useCallback(() => setLightboxOpen(false), [])

   const goNext = useCallback(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length)
   }, [images.length])

   const goPrev = useCallback(() => {
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
   }, [images.length])

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
         <div
            className="relative aspect-video overflow-hidden rounded-lg bg-muted cursor-pointer"
            onClick={() => openLightbox(selectedIndex)}
         >
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

         {lightboxOpen && (
            <div
               className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
               onClick={closeLightbox}
            >
               <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-[101] rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
               >
                  <X className="h-6 w-6" />
               </button>

               {images.length > 1 && (
                  <>
                     <button
                        onClick={(e) => { e.stopPropagation(); goPrev() }}
                        className="absolute left-4 z-[101] rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
                     >
                        <ChevronLeft className="h-6 w-6" />
                     </button>
                     <button
                        onClick={(e) => { e.stopPropagation(); goNext() }}
                        className="absolute right-4 z-[101] rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
                     >
                        <ChevronRight className="h-6 w-6" />
                     </button>
                  </>
               )}

               <div
                  className="relative h-[85vh] w-[90vw] max-w-5xl"
                  onClick={(e) => e.stopPropagation()}
               >
                  <Image
                     src={images[selectedIndex]}
                     alt={`${title} - image ${selectedIndex + 1}`}
                     fill
                     sizes="90vw"
                     className="object-contain"
                  />
               </div>

               <div className="absolute bottom-6 text-white/70 text-sm">
                  {selectedIndex + 1} / {images.length}
               </div>
            </div>
         )}
      </div>
   )
}
