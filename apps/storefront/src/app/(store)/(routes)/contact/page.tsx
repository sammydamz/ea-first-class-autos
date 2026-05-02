import prisma from '@/lib/prisma'

export default async function ContactPage() {
   const siteConfig = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })

   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
               <p className="text-neutral-600 mb-6">
                  Have a question or want to inquire about a vehicle? Reach out to us via WhatsApp or the form below.
               </p>
               <div className="space-y-2">
                  {siteConfig?.businessAddress && (
                     <div>
                        <span className="font-medium">Address:</span> {siteConfig.businessAddress}
                     </div>
                  )}
                  {siteConfig?.businessPhone && (
                     <div>
                        <span className="font-medium">Phone:</span> {siteConfig.businessPhone}
                     </div>
                  )}
                  {siteConfig?.businessEmail && (
                     <div>
                        <span className="font-medium">Email:</span> {siteConfig.businessEmail}
                     </div>
                  )}
               </div>
            </div>
            <div>
               <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
               <p className="text-neutral-600">
                  For the fastest response, we recommend messaging us on WhatsApp using the button on any page.
               </p>
            </div>
         </div>
      </div>
   )
}