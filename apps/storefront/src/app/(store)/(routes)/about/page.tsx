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
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
               About Us
            </p>
             <h1 className="text-[clamp(1.75rem,6vw,4.5rem)] font-bold tracking-tight max-w-4xl leading-[1.1]">
                Quality you can trust.{' '}
                <span className="text-muted-foreground">
                   Service you can feel.
                </span>
             </h1>
             <p className="mt-8 text-[clamp(1rem,2.5vw,1.5rem)] text-muted-foreground max-w-2xl leading-relaxed">
               Ghana's trusted destination for premium pre-owned vehicles, delivering confidence with every purchase since day one.
            </p>
         </section>

         {/* Story Section */}
         <section className="py-24 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
               <div>
                   <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-semibold tracking-tight mb-6">
                      Our Story
                   </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                     EA First Class Autos was founded on a simple belief: buying a used car should feel just as exciting as buying a new one. We handpick every vehicle in our inventory, ensuring each one meets our rigorous standards for quality, reliability, and value.
                  </p>
               </div>
               <div>
                     <p className="text-lg text-muted-foreground leading-relaxed">
                        Our team combines deep automotive knowledge with genuine care for our customers. We don't just sell cars. We help you find the right one, walk you through every detail, and make sure you drive away with complete confidence.
                     </p>
               </div>
            </div>
         </section>

         {/* Values Section */}
         <section className="py-24 bg-neutral-50">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-semibold tracking-tight text-center mb-16">
                   What Sets Us Apart
                </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="text-center">
                      <div className="text-[clamp(1.75rem,6vw,4.5rem)] font-bold mb-4">Fair</div>
                      <h3 className="text-xl font-semibold mb-2">Pricing</h3>
                      <p className="text-muted-foreground leading-relaxed">
                         Transparent, competitive prices with no hidden fees or surprises.
                      </p>
                   </div>
                   <div className="text-center">
                      <div className="text-[clamp(1.75rem,6vw,4.5rem)] font-bold mb-4">Quick</div>
                     <h3 className="text-xl font-semibold mb-2">Response</h3>
                     <p className="text-muted-foreground leading-relaxed">
                        Quick replies via WhatsApp. Your questions answered, fast.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Mission Section */}
         <section className="py-24 max-w-5xl mx-auto text-center">
                <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-semibold tracking-tight mb-8">
                Our Promise
             </h2>
             <p className="text-[clamp(1rem,2.5vw,1.5rem)] text-muted-foreground leading-relaxed max-w-3xl mx-auto">
               We believe in doing right by our customers. No pressure, no shortcuts, just great deals and vehicles that stand the test of time.
            </p>
         </section>

         {/* Contact CTA */}
         <section className="py-24 bg-neutral-900 text-white text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-semibold tracking-tight mb-6">
                   Get in Touch
                </h2>
               <p className="text-lg text-white/70 mb-10 leading-relaxed">
                  Have a question or looking for something specific? We'd love to hear from you.
               </p>
               <div className="space-y-3 text-base text-white/70">
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
