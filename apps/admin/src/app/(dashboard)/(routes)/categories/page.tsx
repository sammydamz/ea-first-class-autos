import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { CategoriesTable } from './components/table'
import { CategoryColumn } from './components/table'

export default async function CategoriesPage() {
   const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: [{ type: 'asc' }, { position: 'asc' }],
   })

   const formattedCategories: CategoryColumn[] = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || null,
      type: cat.type,
      position: cat.position,
      isActive: cat.isActive,
      productCount: cat._count.products,
   }))

   return (
      <div className="block space-y-4 my-6">
         <div className="flex items-center justify-between">
            <Heading
               title={`Categories (${categories.length})`}
               description="Manage product categories"
            />
            <Link href="/categories/new">
               <Button>
                  <Plus className="mr-2 h-4" /> Add New
               </Button>
            </Link>
         </div>
         <Separator />
         {categories.length > 0 ? (
            <CategoriesTable data={formattedCategories} />
         ) : (
            <div className="text-center py-10 text-neutral-500">
               No categories yet. Add your first category to get started.
            </div>
         )}
      </div>
   )
}
