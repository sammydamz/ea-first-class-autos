'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload, Loader2 } from 'lucide-react'

interface ImageUploadProps {
   images: string[]
   onChange: (images: string[]) => void
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
   const [uploading, setUploading] = useState(false)

   const onDrop = async (acceptedFiles: File[]) => {
      setUploading(true)
      try {
         for (const file of acceptedFiles) {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/uploadthing', {
               method: 'POST',
               body: formData,
            })

            if (!res.ok) throw new Error('Upload failed')

            const data = await res.json()
            if (data?.url) {
               onChange([...images, data.url])
            }
         }
      } catch (error) {
         console.error('Upload error:', error)
      } finally {
         setUploading(false)
      }
   }

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
      disabled: uploading,
      maxFiles: 10,
   })

   const removeImage = (index: number) => {
      onChange(images.filter((_, i) => i !== index))
   }

   return (
      <div className="space-y-3">
         <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
               isDragActive ? 'border-rose-500 bg-rose-50' : 'border-input hover:border-rose-300'
            } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
         >
            <input {...getInputProps()} />
            {uploading ? (
               <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground mb-2" />
            ) : (
               <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            )}
            <p className="text-sm text-muted-foreground">
               {uploading ? 'Uploading...' : 'Drag & drop images here, or click to browse'}
            </p>
         </div>

         {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
               {images.map((url, index) => (
                  <div key={index} className="relative group aspect-square rounded-md overflow-hidden bg-muted">
                     <img src={url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                     <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                        <X className="h-3 w-3" />
                     </button>
                     {index === 0 && (
                        <span className="absolute bottom-1 left-1 text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded">
                           Featured
                        </span>
                     )}
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}
