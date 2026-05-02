import prisma from '@/lib/prisma'
import { BannerForm } from './components/banner-form'

const Page = async (props: { params: Promise<{ bannerId: string }> }) => {
   const params = await props.params;
   const [banner, categories] = await Promise.all([
      prisma.banner.findUnique({ where: { id: params.bannerId } }),
      prisma.category.findMany({ orderBy: { title: 'asc' } }),
   ])

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 p-8 pt-6">
            <BannerForm initialData={banner} categories={categories} />
         </div>
      </div>
   )
}

export default Page
