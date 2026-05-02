import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const uploadRouter = {
   carImage: f({ image: { maxFileSize: '4MB', maxFileCount: 10 } })
      .onUploadComplete(({ file }) => {
         console.log('Upload complete:', file.url)
      }),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter
