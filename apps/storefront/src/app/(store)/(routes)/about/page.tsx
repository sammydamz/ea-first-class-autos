import prisma from '@/lib/prisma'

export default async function AboutPage() {
   const siteConfig = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })

   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-6">About Us</h1>
         <div className="prose max-w-none">
            <p className="text-lg mb-4">
               Welcome to {siteConfig?.businessName || 'EA First Class Autos'} - your premier destination for quality pre-owned vehicles.
            </p>
            <p className="mb-4">
               We pride ourselves on offering exceptional customer service and a curated selection of reliable vehicles.
               Our team is dedicated to helping you find the perfect car that fits your needs and budget.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 space-y-2">
               <li>Quality inspected vehicles</li>
               <li>Competitive pricing</li>
               <li>Friendly, knowledgeable staff</li>
               <li>WhatsApp inquiry for quick responses</li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
             <div className="space-y-1">
                {siteConfig?.businessAddress && <p>Address: {siteConfig.businessAddress}</p>}
                {siteConfig?.businessPhone && <p>Phone: {siteConfig.businessPhone}</p>}
                {siteConfig?.businessEmail && <p>Email: {siteConfig.businessEmail}</p>}
             </div>
         </div>
      </div>
   )
}