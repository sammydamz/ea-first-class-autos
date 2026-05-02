import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, Users } from 'lucide-react'

export default async function AdminDashboard() {
   const authenticated = await isAuthenticated()

   if (!authenticated) {
      redirect('/admin/login')
   }

   const [totalCars, availableCars, totalBrands] = await Promise.all([
      prisma.car.count({ where: { isDeleted: false } }),
      prisma.car.count({ where: { isDeleted: false, isAvailable: true } }),
      prisma.brand.count(),
   ])

   return (
      <div className="p-8">
         <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
         
         <div className="grid gap-4 md:grid-cols-3">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{totalCars}</div>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Cars</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{availableCars}</div>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Brands</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{totalBrands}</div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}