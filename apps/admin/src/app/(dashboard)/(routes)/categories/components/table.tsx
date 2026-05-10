'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

interface CategoriesTableProps {
   data: CategoryColumn[]
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({ data }) => {
   return <DataTable searchKey="name" columns={columns} data={data} />
}

export type CategoryColumn = {
   id: string
   name: string
   slug: string
   description: string
   image: string | null
   type: string
   position: number
   isActive: boolean
   productCount: number
}

function DeleteButton({ categoryId }: { categoryId: string }) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)

   const handleDelete = async () => {
      if (!confirm('Are you sure you want to delete this category?')) return
      setLoading(true)
      try {
         const res = await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' })
         if (!res.ok) throw new Error()
         toast.success('Category deleted.')
         router.refresh()
      } catch {
         toast.error('Failed to delete category.')
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

function ToggleActiveButton({ categoryId, isActive }: { categoryId: string; isActive: boolean }) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)

   const handleToggle = async () => {
      setLoading(true)
      try {
         const res = await fetch(`/api/categories/${categoryId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: !isActive }),
         })
         if (!res.ok) throw new Error()
         toast.success(isActive ? 'Category deactivated.' : 'Category activated.')
         router.refresh()
      } catch {
         toast.error('Failed to update status.')
      } finally {
         setLoading(false)
      }
   }

   return (
      <Button
         size="icon"
         variant="outline"
         onClick={handleToggle}
         disabled={loading}
         title={isActive ? 'Deactivate' : 'Activate'}
      >
         <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
      </Button>
   )
}

export const columns: ColumnDef<CategoryColumn>[] = [
   {
      accessorKey: 'image',
      header: '',
      cell: ({ row }) => {
         const src = row.original.image
         if (!src) return <div className="h-10 w-14 rounded bg-muted" />
         return (
            <div className="relative h-10 w-14 rounded overflow-hidden bg-muted">
               <Image src={src} alt={row.original.name} fill className="object-cover" sizes="56px" />
            </div>
         )
      },
   },
   {
      accessorKey: 'name',
      header: 'Name',
   },
   {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
         <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">
            {row.original.type}
         </span>
      ),
   },
   {
      accessorKey: 'position',
      header: 'Position',
   },
   {
      accessorKey: 'isActive',
      header: 'Status',
      cell: (props) => {
         const active = props.cell.getValue() as boolean
         return (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
               active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
               {active ? 'Active' : 'Inactive'}
            </span>
         )
      },
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
            <Link href={`/categories/${row.original.id}`}>
               <Button size="icon" variant="outline">
                  <EditIcon className="h-4" />
               </Button>
            </Link>
            <ToggleActiveButton categoryId={row.original.id} isActive={row.original.isActive} />
            <DeleteButton categoryId={row.original.id} />
         </div>
      ),
   },
]
