import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const uploadRouter = {
   carImage: f({ image: { maxFileSize: '4MB', maxFileCount: 10 } })
      .onUploadComplete(() => {
         console.log('Upload complete')
      }),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter