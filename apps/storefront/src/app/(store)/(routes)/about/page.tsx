import prisma from '@/lib/prisma'
import Image from 'next/image'

export default async function AboutPage() {
   const siteConfig = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })

   return (
      <div className="flex flex-col">
         {/* Hero Section */}
         <section className="flex flex-col items-center justify-center min-h-[60vh] text-center py-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
               About Us
            </p>
            <h1 className="text-display font-bold max-w-4xl">
               Quality you can trust.{' '}
               <span className="text-muted-foreground">
                  Service you can feel.
               </span>
            </h1>
            <p className="mt-8 text-subtitle text-muted-foreground max-w-2xl">
               Ghana's trusted destination for premium pre-owned vehicles, delivering confidence with every purchase since day one.
            </p>
         </section>

         {/* Story Section */}
         <section className="py-24 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
               <div>
                   <h2 className="text-heading font-semibold mb-6">
                      Our Story
                   </h2>
                  <p className="text-body-lg text-muted-foreground">
                     EA First Class Autos was founded on a simple belief: buying a used car should feel just as exciting as buying a new one. We handpick every vehicle in our inventory, ensuring each one meets our rigorous standards for quality, reliability, and value.
                  </p>
               </div>
               <div>
                     <p className="text-body-lg text-muted-foreground">
                        Our team combines deep automotive knowledge with genuine care for our customers. We don't just sell cars. We help you find the right one, walk you through every detail, and make sure you drive away with complete confidence.
                     </p>
               </div>
            </div>
         </section>

         {/* Values Section */}
         <section className="py-24 bg-neutral-50">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-heading font-semibold text-center mb-16">
                   What Sets Us Apart
                </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="text-center">
                      <div className="text-decorative font-bold mb-4">Fair</div>
                      <h3 className="text-subheading font-semibold mb-2">Pricing</h3>
                      <p className="text-small text-muted-foreground">
                         Transparent, competitive prices with no hidden fees or surprises.
                      </p>
                   </div>
                   <div className="text-center">
                      <div className="text-decorative font-bold mb-4">Quick</div>
                     <h3 className="text-subheading font-semibold mb-2">Response</h3>
                     <p className="text-small text-muted-foreground">
                        Quick replies via WhatsApp. Your questions answered, fast.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Mission Section */}
         <section className="py-24 max-w-5xl mx-auto text-center">
                <h2 className="text-heading font-semibold mb-8">
                Our Promise
             </h2>
             <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
               We believe in doing right by our customers. No pressure, no shortcuts, just great deals and vehicles that stand the test of time.
            </p>
         </section>

         {/* Contact CTA */}
         <section className="py-24 bg-neutral-900 text-white text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-heading font-semibold mb-6">
                   Get in Touch
                </h2>
               <p className="text-body-lg text-white/70 mb-10">
                  Have a question or looking for something specific? We'd love to hear from you.
               </p>
               <div className="space-y-3 text-small text-white/70">
                  {siteConfig?.businessAddress && (
                     <p>{siteConfig.businessAddress}</p>
                  )}
                  {siteConfig?.businessPhone && (
                     <p>{siteConfig.businessPhone}</p>
                  )}
                  {siteConfig?.businessEmail && (
                     <p>{siteConfig.businessEmail}</p>
                  )}
               </div>
            </div>
         </section>
      </div>
   )
}
