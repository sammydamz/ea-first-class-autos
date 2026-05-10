import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { SupplierForm } from './components/supplier-form'

interface Props {
   params: Promise<{ supplierId: string }>
}

export default async function SupplierPage(props: Props) {
   const params = await props.params
   const supplierId = params.supplierId

   const supplier = supplierId === 'new'
      ? null
      : await prisma.supplier.findUnique({ where: { id: supplierId } })

   if (supplierId !== 'new' && !supplier) {
      notFound()
   }

   return (
      <div className="container mx-auto py-6">
         <Heading title={supplier ? 'Edit Supplier' : 'Add Supplier'} description={supplier ? 'Edit supplier details' : 'Add a new supplier'} />
         <Separator className="my-6" />
         <SupplierForm initialData={supplier} />
      </div>
   )
}
