'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import { CategoryImageUpload } from './category-image-upload'

export function CategoryForm({ initialData }: { initialData?: any }) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState({
      name: initialData?.name || '',
      description: initialData?.description || '',
      image: initialData?.image || '',
      type: initialData?.type || 'STANDARD',
      position: initialData?.position?.toString() || '0',
      isActive: initialData?.isActive ?? true,
   })

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         const payload = {
            ...data,
            position: parseInt(data.position) || 0,
         }

         const method = initialData ? 'PATCH' : 'POST'
         const url = initialData ? `/api/categories/${initialData.id}` : '/api/categories'

         const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error('Failed to save')

         toast.success(initialData ? 'Category updated!' : 'Category created!')
         router.push('/categories')
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
               <Label>Type</Label>
               <Select value={data.type} onValueChange={(value) => setData({ ...data, type: value })}>
                  <SelectTrigger>
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="STANDARD">Standard</SelectItem>
                     <SelectItem value="VARIANT">Variant</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="space-y-2">
               <Label>Position</Label>
               <Input
                  type="number"
                  value={data.position}
                  onChange={(e) => setData({ ...data, position: e.target.value })}
               />
            </div>
            <div className="flex items-center gap-2 pt-6">
               <Checkbox
                  id="isActive"
                  checked={data.isActive}
                  onCheckedChange={(checked) => setData({ ...data, isActive: !!checked })}
               />
               <Label htmlFor="isActive">Active</Label>
            </div>
         </div>

         <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
               value={data.description}
               onChange={(e) => setData({ ...data, description: e.target.value })}
               rows={4}
            />
         </div>

         <div className="space-y-2">
            <Label>Image</Label>
            <CategoryImageUpload
               images={data.image ? [data.image] : []}
               onChange={(urls) => setData({ ...data, image: urls[0] || '' })}
            />
         </div>

         <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
               {loading ? 'Saving...' : initialData ? 'Update Category' : 'Create Category'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
               Cancel
            </Button>
         </div>
      </form>
   )
}
