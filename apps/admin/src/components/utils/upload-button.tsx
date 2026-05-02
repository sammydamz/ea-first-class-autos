'use client'

import { useDropzone, type FileWithUrl } from 'react-dropzone'
import { generateReactDropzone } from '@uploadthing/react'

export const { UploadButton, UploadDropzone } = generateReactDropzone({
   url: process.env.NEXT_PUBLIC_UPLOADTHING_URL || '/api/uploadthing',
})