'use client'

import { generateReactDropzone } from '@uploadthing/react'

export const { UploadButton, UploadDropzone } = generateReactDropzone({
   url: '/api/uploadthing',
})