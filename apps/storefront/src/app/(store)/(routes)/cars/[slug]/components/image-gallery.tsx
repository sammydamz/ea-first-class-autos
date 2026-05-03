'use client'

import Image from 'next/image'
import { useState, useCallback, useRef, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type ImageGalleryProps = {
   images: string[]
   title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
   const [selectedIndex, setSelectedIndex] = useState(0)
   const [lightboxOpen, setLightboxOpen] = useState(false)
   const [dragOffset, setDragOffset] = useState(0)
   const [isDragging, setIsDragging] = useState(false)
   const lightboxRef = useRef<HTMLDivElement>(null)
   const touchStartX = useRef(0)
   const lastTouchX = useRef(0)

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

   const handleTouchStart = useCallback((e: React.TouchEvent) => {
      touchStartX.current = e.changedTouches[0].clientX
      lastTouchX.current = e.changedTouches[0].clientX
      setIsDragging(true)
      setDragOffset(0)
   }, [])

   const handleTouchMove = useCallback((e: React.TouchEvent) => {
      if (!isDragging) return
      const currentX = e.changedTouches[0].clientX
      const diff = currentX - touchStartX.current
      lastTouchX.current = currentX
      setDragOffset(diff)
   }, [isDragging])

   const handleTouchEnd = useCallback(() => {
      setIsDragging(false)
      const threshold = 60
      if (dragOffset < -threshold) goNext()
      else if (dragOffset > threshold) goPrev()
      setDragOffset(0)
   }, [dragOffset, goNext, goPrev])

   useEffect(() => {
      if (!lightboxOpen) return
      const handleKey = (e: KeyboardEvent) => {
         if (e.key === 'Escape') closeLightbox()
         if (e.key === 'ArrowRight') goNext()
         if (e.key === 'ArrowLeft') goPrev()
      }
      window.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
      return () => {
         window.removeEventListener('keydown', handleKey)
         document.body.style.overflow = ''
      }
   }, [lightboxOpen, closeLightbox, goNext, goPrev])

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
            className="relative aspect-[4/3] sm:aspect-video overflow-hidden rounded-lg bg-muted cursor-pointer group"
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
            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
               {selectedIndex + 1}/{images.length}
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
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
               ref={lightboxRef}
               className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
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
                  onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(e) }}
                  onTouchMove={(e) => { e.stopPropagation(); handleTouchMove(e) }}
                  onTouchEnd={(e) => { e.stopPropagation(); handleTouchEnd() }}
                  style={{
                     transform: `translateX(${dragOffset}px)`,
                     transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                  }}
               >
                  <Image
                     src={images[selectedIndex]}
                     alt={`${title} - image ${selectedIndex + 1}`}
                     fill
                     sizes="90vw"
                     className="object-contain"
                     draggable={false}
                  />
               </div>

               <div className="absolute bottom-6 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  <span className="font-medium">{selectedIndex + 1}</span>
                  <span className="text-white/50">/</span>
                  <span>{images.length}</span>
               </div>
            </div>
         )}
      </div>
   )
}
