'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface PaginationProps {
   page: number
   totalPages: number
}

export function Pagination({ page, totalPages }: PaginationProps) {
   const router = useRouter()
   const searchParams = useSearchParams()

   const goTo = (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', newPage.toString())
      router.push(`/cars?${params.toString()}`)
   }

   return (
      <div className="flex justify-center gap-2 mt-8">
         <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => goTo(page - 1)}
         >
            Previous
         </Button>
         <span className="flex items-center px-4">
            {page} / {totalPages}
         </span>
         <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => goTo(page + 1)}
         >
            Next
         </Button>
      </div>
   )
}