'use client'

import { getAvailableCars, getSoldCars, getTotalCars } from '@/actions/get-car-counts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Car, Package, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default async function DashboardPage() {
   // Note: This is a server component, but since we're doing simple counts
   // we'll render them directly
   return <DashboardContent />
}

async function DashboardContent() {
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

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-4">
            <Heading title="Dashboard" description="Overview of your inventory" />
            <Separator />
            <div className="grid gap-4 grid-cols-3">
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Total Cars
                     </CardTitle>
                     <Car className="h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{counts.total}</div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Available
                     </CardTitle>
                     <Package className="h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{counts.available}</div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Sold
                     </CardTitle>
                     <CheckCircle className="h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{counts.sold}</div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
}