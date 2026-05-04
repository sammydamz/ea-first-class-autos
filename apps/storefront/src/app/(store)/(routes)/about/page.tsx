import prisma from '@/lib/prisma'
import { TypedHero } from '@/components/native/TypedHero'

export default async function AboutPage() {
   const siteConfig = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })

   return (
      <div className="flex flex-col">
         <section className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] text-center py-14 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
               About Us
            </p>
             <TypedHero />
            <p className="mt-8 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
               Ghana's trusted destination for premium pre-owned vehicles, delivering confidence with every purchase since day one.
            </p>
         </section>

          <section className="pt-0 pb-10 sm:pb-16 max-w-5xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-start">
                <div>
                    <h2 className="text-heading font-semibold mb-6">
                       Our Story
                    </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                     EA First Class Autos was founded on a simple belief: buying a used car should feel just as exciting as buying a new one. We handpick every vehicle in our inventory, ensuring each one meets our rigorous standards for quality, reliability, and value.
                  </p>
               </div>
               <div>
                     <p className="text-base text-muted-foreground leading-relaxed">
                        Our team combines deep automotive knowledge with genuine care for our customers. We don't just sell cars. We help you find the right one, walk you through every detail, and make sure you drive away with complete confidence.
                     </p>
               </div>
            </div>
         </section>

         <section className="py-10 sm:py-16">
             <div className="max-w-5xl mx-auto">
                <div className="bg-black text-white px-4 py-2.5">
                   <span className="text-[11px] font-bold uppercase tracking-[0.12em]">What Sets Us Apart</span>
                </div>
                <div className="grid grid-cols-2 border-2 border-black">
                   <div className="p-5 sm:p-6 border-r-2 border-black">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-black/40 mb-3">01</span>
                      <span className="block text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-none tracking-tight">Fair</span>
                      <span className="block text-sm font-semibold mt-1 mb-2">Pricing</span>
                      <p className="text-sm text-black/60 leading-relaxed">
                         Transparent, competitive prices with no hidden fees or surprises.
                      </p>
                   </div>
                   <div className="p-5 sm:p-6">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-black/40 mb-3">02</span>
                      <span className="block text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-none tracking-tight">Quick</span>
                      <span className="block text-sm font-semibold mt-1 mb-2">Response</span>
                      <p className="text-sm text-black/60 leading-relaxed">
                         All your needs sorted ASAP.
                      </p>
                   </div>
                </div>
             </div>
          </section>

         <section className="py-10 sm:py-16 max-w-5xl mx-auto text-center">
                <h2 className="text-heading font-semibold mb-6">
                Our Promise
             </h2>
             <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
               We believe in doing right by our customers. No pressure, no shortcuts, just great deals and vehicles that stand the test of time.
            </p>
         </section>

         <section className="py-10 sm:py-16 bg-neutral-900 text-white text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-heading font-semibold mb-6">
                   Get in Touch
                </h2>
               <p className="text-sm text-white/70 mb-8 leading-relaxed">
                  Have a question or looking for something specific? We'd love to hear from you.
               </p>
               <div className="space-y-2 text-sm text-white/70">
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
