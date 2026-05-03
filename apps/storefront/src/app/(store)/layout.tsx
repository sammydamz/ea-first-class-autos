import Footer from '@/components/native/Footer'
import Header from '@/components/native/nav/parent'
import prisma from '@/lib/prisma'
import { FloatingWhatsApp } from '@/components/native/FloatingWhatsApp'

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const siteConfig = await prisma.siteConfig.findUnique({
      where: { id: 'default' },
   })
   const whatsappNumber = siteConfig?.defaultWhatsApp || ''

   return (
      <div className="min-h-screen flex flex-col">
         <Header />
         <main className="flex-1 px-[clamp(0.75rem,3vw,2rem)] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            {children}
         </main>
         <Footer />
         {whatsappNumber && <FloatingWhatsApp number={whatsappNumber} />}
      </div>
   )
}
