'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'

export function SupplierForm({ initialData }: { initialData?: any }) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState({
      name: initialData?.name || '',
      phone: initialData?.phone || '',
      email: initialData?.email || '',
      address: initialData?.address || '',
   })

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         const method = initialData ? 'PATCH' : 'POST'
         const url = initialData ? `/api/suppliers/${initialData.id}` : '/api/suppliers'

         const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         })

         if (!res.ok) throw new Error('Failed to save')

         toast.success(initialData ? 'Supplier updated!' : 'Supplier created!')
         router.push('/suppliers')
         router.refresh()
      } catch (error) {
         toast.error('Something went wrong')
      } finally {
         setLoading(false)
      }
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label>Name *</Label>
               <Input
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
               />
            </div>
            <div className="space-y-2">
               <Label>Phone</Label>
               <Input
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
               />
            </div>
            <div className="space-y-2">
               <Label>Email</Label>
               <Input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
               />
            </div>
         </div>

         <div className="space-y-2">
            <Label>Address</Label>
            <Textarea
               value={data.address}
               onChange={(e) => setData({ ...data, address: e.target.value })}
               rows={3}
            />
         </div>

         <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
               {loading ? 'Saving...' : initialData ? 'Update Supplier' : 'Create Supplier'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
               Cancel
            </Button>
         </div>
      </form>
   )
}
