'use client'

import { useState } from 'react'
import { UploadButton } from '@/components/utils/upload-button'

interface CategoryImageUploadProps {
   images: string[]
   onChange: (value: string[]) => void
   disabled?: boolean
}

export function CategoryImageUpload({ images, onChange, disabled }: CategoryImageUploadProps) {
   return (
      <div className="space-y-4">
         <div className="flex flex-wrap gap-4">
            {images.map((url, index) => (
               <div key={index} className="relative w-32 h-32">
                  <img
                     src={url}
                     alt={`Image ${index + 1}`}
                     className="w-full h-full object-cover rounded"
                  />
                  <button
                     type="button"
                     onClick={() => onChange(images.filter((_, i) => i !== index))}
                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                  >
                     X
                  </button>
               </div>
            ))}
         </div>
         <UploadButton
            endpoint="categoryImage"
            onClientUploadComplete={(res) => {
               const urls = res.map((r) => r.url)
               onChange([...images, ...urls])
            }}
            onUploadError={(error: Error) => {
               console.error(error)
            }}
         />
      </div>
   )
}
