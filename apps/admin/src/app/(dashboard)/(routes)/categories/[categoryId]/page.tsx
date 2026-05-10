import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { CategoryForm } from './components/category-form'

interface Props {
   params: Promise<{ categoryId: string }>
}

export default async function CategoryPage(props: Props) {
   const params = await props.params
   const categoryId = params.categoryId

   const category = categoryId === 'new'
      ? null
      : await prisma.category.findUnique({ where: { id: categoryId } })

   if (categoryId !== 'new' && !category) {
      notFound()
   }

   return (
      <div className="container mx-auto py-6">
         <Heading title={category ? 'Edit Category' : 'Add Category'} description={category ? 'Edit category details' : 'Add a new category'} />
         <Separator className="my-6" />
         <CategoryForm initialData={category} />
      </div>
   )
}
