'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Car, Package, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
   const [counts, setCounts] = useState({ total: 0, available: 0, sold: 0 })

   useEffect(() => {
      async function fetchCounts() {
         try {
            const res = await fetch('/api/dashboard/cars')
            const data = await res.json()
            setCounts(data)
         } catch (e) {
            console.error('Failed to fetch counts', e)
         }
      }
      fetchCounts()
   }, [])

   const stats = [
      { label: 'Total Cars', value: counts.total, icon: Car },
      { label: 'Available', value: counts.available, icon: Package },
      { label: 'Sold', value: counts.sold, icon: CheckCircle },
   ]

   return (
      <div className="flex-col">
         <div className="flex-1 pt-8 pb-12">
            <Heading title="Dashboard" description="Overview of your inventory" />
            <Separator className="my-6" />

            <div className="grid gap-0 md:grid-cols-3 md:divide-x">
               {stats.map((stat) => (
                  <div key={stat.label} className="py-6 md:px-8 first:pl-0 last:pr-0">
                     <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-muted-foreground">
                           {stat.label}
                        </p>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                     </div>
                     <div className="text-3xl font-bold tracking-tight">
                        {stat.value}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
