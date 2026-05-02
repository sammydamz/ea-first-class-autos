'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { EditIcon, TrashIcon, ArrowRightLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

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
   image: string | null
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

function ToggleStatusButton({ carId, isAvailable }: { carId: string; isAvailable: boolean }) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)

   const handleToggle = async () => {
      setLoading(true)
      try {
         const res = await fetch(`/api/cars/${carId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isAvailable: !isAvailable }),
         })
         if (!res.ok) throw new Error()
         toast.success(isAvailable ? 'Car marked as sold.' : 'Car marked as available.')
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
         title={isAvailable ? 'Mark as Sold' : 'Mark as Available'}
      >
         <ArrowRightLeft className="h-4" />
      </Button>
   )
}

export const columns: ColumnDef<CarColumn>[] = [
   {
      accessorKey: 'image',
      header: '',
      cell: ({ row }) => {
         const src = row.original.image
         if (!src) return <div className="h-10 w-14 rounded bg-muted" />
         return (
            <div className="relative h-10 w-14 rounded overflow-hidden bg-muted">
               <Image src={src} alt={row.original.title} fill className="object-cover" sizes="56px" />
            </div>
         )
      },
   },
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
      cell: (props) => {
         const available = props.cell.getValue() as boolean
         return (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
               available
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
            }`}>
               {available ? 'Available' : 'Sold'}
            </span>
         )
      },
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
            <ToggleStatusButton carId={row.original.id} isAvailable={row.original.isAvailable} />
            <DeleteButton carId={row.original.id} />
         </div>
      ),
   },
]
