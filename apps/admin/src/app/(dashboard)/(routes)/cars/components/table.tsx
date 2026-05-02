'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, EditIcon, TrashIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface CarsTableProps {
   data: CarColumn[]
}

export const CarsTable: React.FC<CarsTableProps> = ({ data }) => {
   return <DataTable searchKey="title" columns={columns} data={data} />
}

export type CarColumn = {
   id: string
   title: string
   price: string
   brand: string
   condition: string
   isAvailable: boolean
}

function DeleteButton({ carId }: { carId: string }) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)

   const handleDelete = async () => {
      if (!confirm('Are you sure you want to delete this car?')) return
      setLoading(true)
      try {
         const res = await fetch(`/api/cars/${carId}`, { method: 'DELETE' })
         if (!res.ok) throw new Error()
         toast.success('Car deleted.')
         router.refresh()
      } catch {
         toast.error('Failed to delete car.')
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

export const columns: ColumnDef<CarColumn>[] = [
   {
      accessorKey: 'title',
      header: 'Title',
   },
   {
      accessorKey: 'brand',
      header: 'Brand',
   },
   {
      accessorKey: 'condition',
      header: 'Condition',
   },
   {
      accessorKey: 'price',
      header: 'Price',
   },
   {
      accessorKey: 'isAvailable',
      header: 'Status',
      cell: (props) =>
         props.cell.getValue() ? (
            <CheckIcon className="text-green-500" />
         ) : (
            <XIcon className="text-red-500" />
         ),
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <div className="flex gap-1">
            <Link href={`/cars/${row.original.id}`}>
               <Button size="icon" variant="outline">
                  <EditIcon className="h-4" />
               </Button>
            </Link>
            <DeleteButton carId={row.original.id} />
         </div>
      ),
   },
]
