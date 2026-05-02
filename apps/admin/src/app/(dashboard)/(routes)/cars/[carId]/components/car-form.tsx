'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUpload } from '@/components/image-upload'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'

interface Brand {
   id: string
   title: string
}

interface Category {
   id: string
   title: string
}

export function CarForm({
   brands,
   categories,
   initialData,
}: {
   brands: Brand[]
   categories: Category[]
   initialData?: any
}) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState({
      title: initialData?.title || '',
      model: initialData?.model || '',
      year: initialData?.year?.toString() || '',
      price: initialData?.price?.toString() || '',
      isNegotiable: initialData?.isNegotiable || false,
      condition: initialData?.condition || 'Used',
      description: initialData?.description || '',
      specifications: initialData?.specifications ? JSON.stringify(initialData.specifications, null, 2) : '{"Mileage": "", "Fuel": ""}',
      images: initialData?.images?.join('\n') || '',
      whatsappNumber: initialData?.whatsappNumber || '',
      isAvailable: initialData?.isAvailable ?? true,
      brandId: initialData?.brandId || '',
   })
   const [selectedCategories, setSelectedCategories] = useState<string[]>(
      initialData?.categories?.map((c: any) => c.id) || []
   )

   const toggleCategory = (categoryId: string) => {
      setSelectedCategories(prev =>
         prev.includes(categoryId)
            ? prev.filter(id => id !== categoryId)
            : [...prev, categoryId]
      )
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         const specifications = JSON.parse(data.specifications || '{}')

         const payload = {
            ...data,
            year: parseInt(data.year) || null,
            price: parseFloat(data.price) || 0,
            specifications,
            images: data.images.split('\n').filter(Boolean),
            brandId: data.brandId,
            categoryIds: selectedCategories,
         }

         const method = initialData ? 'PATCH' : 'POST'
         const url = initialData
            ? `/api/cars/${initialData.id}`
            : '/api/cars'

         const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error('Failed to save')

         toast.success(initialData ? 'Car updated!' : 'Car created!')
         router.push('/cars')
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
               <Label>Title *</Label>
               <Input
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  required
               />
            </div>
            <div className="space-y-2">
               <Label>Brand *</Label>
               <Select
                  value={data.brandId}
                  onValueChange={(value) => setData({ ...data, brandId: value })}
               >
                  <SelectTrigger>
                     <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                     {brands.map((b) => (
                        <SelectItem key={b.id} value={b.id}>{b.title}</SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
            <div className="space-y-2">
               <Label>Model</Label>
               <Input
                  value={data.model}
                  onChange={(e) => setData({ ...data, model: e.target.value })}
               />
            </div>
            <div className="space-y-2">
               <Label>Year</Label>
               <Input
                  type="number"
                  value={data.year}
                  onChange={(e) => setData({ ...data, year: e.target.value })}
               />
            </div>
            <div className="space-y-2">
               <Label>Price *</Label>
               <Input
                  type="number"
                  value={data.price}
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                  required
               />
            </div>
            <div className="flex items-center gap-6">
               <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select
                     value={data.condition}
                     onValueChange={(value) => setData({ ...data, condition: value })}
                  >
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Used">Used</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="flex items-center gap-2 pt-6">
                  <Checkbox
                     id="isNegotiable"
                     checked={data.isNegotiable}
                     onCheckedChange={(checked) => setData({ ...data, isNegotiable: !!checked })}
                  />
                  <Label htmlFor="isNegotiable">Negotiable</Label>
               </div>
            </div>
         </div>

         <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2">
               {categories.map((cat) => (
                  <label
                     key={cat.id}
                     className={`flex items-center gap-2 px-3 py-1.5 rounded-md border cursor-pointer transition-colors ${
                        selectedCategories.includes(cat.id)
                           ? 'bg-primary text-primary-foreground border-primary'
                           : 'bg-background border-input hover:bg-accent'
                     }`}
                  >
                     <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                     />
                     {cat.title}
                  </label>
               ))}
            </div>
            {categories.length === 0 && (
               <p className="text-sm text-muted-foreground">No categories yet. Create some first.</p>
            )}
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
            <Label>Specifications (JSON)</Label>
            <Textarea
               value={data.specifications}
               onChange={(e) => setData({ ...data, specifications: e.target.value })}
               rows={4}
               placeholder='{"Mileage": "10000", "Fuel": "Petrol"}'
            />
         </div>

         <div className="space-y-2">
            <Label>Images</Label>
            <ImageUpload
               images={data.images.split('\n').filter(Boolean)}
               onChange={(urls) => setData({ ...data, images: urls.join('\n') })}
            />
            <p className="text-xs text-muted-foreground">First image is the featured image. Or paste URLs below:</p>
            <Textarea
               value={data.images}
               onChange={(e) => setData({ ...data, images: e.target.value })}
               rows={3}
               placeholder="https://example.com/image1.jpg"
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label>WhatsApp Number</Label>
               <Input
                  value={data.whatsappNumber}
                  onChange={(e) => setData({ ...data, whatsappNumber: e.target.value })}
                  placeholder="1234567890"
               />
            </div>
            <div className="space-y-2">
               <Label>Status</Label>
               <Select
                  value={data.isAvailable ? 'available' : 'sold'}
                  onValueChange={(value) => setData({ ...data, isAvailable: value === 'available' })}
               >
                  <SelectTrigger>
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="available">Available</SelectItem>
                     <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>

         <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
               {loading ? 'Saving...' : initialData ? 'Update Car' : 'Create Car'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
               Cancel
            </Button>
         </div>
      </form>
   )
}
