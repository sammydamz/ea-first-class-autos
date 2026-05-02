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
      <>
         <Header />
         <div className="px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            {children}
         </div>
         <Footer />
         {whatsappNumber && <FloatingWhatsApp number={whatsappNumber} />}
      </>
   )
}
