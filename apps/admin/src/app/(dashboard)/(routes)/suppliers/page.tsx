import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { SuppliersTable } from './components/table'
import { SupplierColumn } from './components/table'

export default async function SuppliersPage() {
   const suppliers = await prisma.supplier.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { createdAt: 'desc' },
   })

   const formattedSuppliers: SupplierColumn[] = suppliers.map((sup) => ({
      id: sup.id,
      name: sup.name,
      phone: sup.phone || '',
      email: sup.email || '',
      address: sup.address || '',
      productCount: sup._count.products,
   }))

   return (
      <div className="block space-y-4 my-6">
         <div className="flex items-center justify-between">
            <Heading
               title={`Suppliers (${suppliers.length})`}
               description="Manage product suppliers"
            />
            <Link href="/suppliers/new">
               <Button>
                  <Plus className="mr-2 h-4" /> Add New
               </Button>
            </Link>
         </div>
         <Separator />
         {suppliers.length > 0 ? (
            <SuppliersTable data={formattedSuppliers} />
         ) : (
            <div className="text-center py-10 text-neutral-500">
               No suppliers yet. Add your first supplier to get started.
            </div>
         )}
      </div>
   )
}
