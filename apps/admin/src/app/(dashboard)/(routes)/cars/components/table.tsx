'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, EditIcon, XIcon } from 'lucide-react'
import Link from 'next/link'

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
         <Link href={`/cars/${row.original.id}`}>
            <Button size="icon" variant="outline">
               <EditIcon className="h-4" />
            </Button>
         </Link>
      ),
   },
]