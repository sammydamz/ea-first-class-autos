'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface SuppliersTableProps {
   data: SupplierColumn[]
}

export const SuppliersTable: React.FC<SuppliersTableProps> = ({ data }) => {
   return <DataTable searchKey="name" columns={columns} data={data} />
}

export type SupplierColumn = {
   id: string
   name: string
   phone: string
   email: string
   address: string
   productCount: number
}

function DeleteButton({ supplierId }: { supplierId: string }) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)

   const handleDelete = async () => {
      if (!confirm('Are you sure you want to delete this supplier?')) return
      setLoading(true)
      try {
         const res = await fetch(`/api/suppliers/${supplierId}`, { method: 'DELETE' })
         if (!res.ok) throw new Error()
         toast.success('Supplier deleted.')
         router.refresh()
      } catch {
         toast.error('Failed to delete supplier.')
      } finally {
         setLoading(false)
      }
   }

   return (
      <Button size="icon" variant="outline" onClick={handleDelete} disabled={loading}>
         <TrashIcon className="h-4" />
      </Button>
   )
}

export const columns: ColumnDef<SupplierColumn>[] = [
   {
      accessorKey: 'name',
      header: 'Name',
   },
   {
      accessorKey: 'phone',
      header: 'Phone',
   },
   {
      accessorKey: 'email',
      header: 'Email',
   },
   {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => (
         <span className="text-sm text-muted-foreground">{row.original.address || '-'}</span>
      ),
   },
   {
      accessorKey: 'productCount',
      header: 'Products',
      cell: ({ row }) => (
         <span className="text-sm">{row.original.productCount}</span>
      ),
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <div className="flex gap-1">
            <Link href={`/suppliers/${row.original.id}`}>
               <Button size="icon" variant="outline">
                  <EditIcon className="h-4" />
               </Button>
            </Link>
            <DeleteButton supplierId={row.original.id} />
         </div>
      ),
   },
]
