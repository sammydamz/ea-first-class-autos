import { createRouteHandler } from 'uploadthing/next'
import { uploadRouter } from 'apps/storefront/src/lib/uploadthing'

export const { GET, POST } = createRouteHandler({
   router: uploadRouter,
})