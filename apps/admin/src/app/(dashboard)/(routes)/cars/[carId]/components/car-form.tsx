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
import { Plus, X, GripVertical } from 'lucide-react'

interface Brand {
   id: string
   title: string
}

interface Category {
   id: string
   title: string
}

interface SpecRow {
   key: string
   value: string
}

function parseSpecs(raw: Record<string, any> | null | undefined): SpecRow[] {
   if (!raw || typeof raw !== 'object') return [{ key: '', value: '' }]
   const entries = Object.entries(raw)
   if (entries.length === 0) return [{ key: '', value: '' }]
   return entries.map(([key, value]) => ({ key, value: String(value) }))
}

function specsToRecord(rows: SpecRow[]): Record<string, string> {
   const result: Record<string, string> = {}
   for (const row of rows) {
      const k = row.key.trim()
      if (k) result[k] = row.value
   }
   return result
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
      images: initialData?.images?.join('\n') || '',
      whatsappNumber: initialData?.whatsappNumber || '',
      isAvailable: initialData?.isAvailable ?? true,
      brandId: initialData?.brandId || '',
   })
   const [specs, setSpecs] = useState<SpecRow[]>(parseSpecs(initialData?.specifications))
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

   const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
      setSpecs(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s))
   }

   const addSpec = () => setSpecs(prev => [...prev, { key: '', value: '' }])

   const removeSpec = (index: number) => {
      setSpecs(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev)
   }

   const moveSpec = (from: number, to: number) => {
      if (to < 0 || to >= specs.length) return
      setSpecs(prev => {
         const arr = [...prev]
         const [item] = arr.splice(from, 1)
         arr.splice(to, 0, item)
         return arr
      })
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         const payload = {
            ...data,
            year: parseInt(data.year) || null,
            price: parseFloat(data.price) || 0,
            specifications: specsToRecord(specs),
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
                  step="0.01"
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

         <div className="space-y-3">
            <div className="flex items-center justify-between">
               <Label>Specifications</Label>
               <Button type="button" variant="outline" size="sm" onClick={addSpec}>
                  <Plus className="h-3 w-3 mr-1" /> Add Spec
               </Button>
            </div>
            <div className="space-y-2">
               {specs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                     <div className="flex gap-1 shrink-0">
                        <button
                           type="button"
                           className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                           disabled={index === 0}
                           onClick={() => moveSpec(index, index - 1)}
                        >
                           <GripVertical className="h-3 w-3 rotate-180" />
                        </button>
                        <button
                           type="button"
                           className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                           disabled={index === specs.length - 1}
                           onClick={() => moveSpec(index, index + 1)}
                        >
                           <GripVertical className="h-3 w-3" />
                        </button>
                     </div>
                     <Input
                        placeholder="Label (e.g. Mileage)"
                        value={spec.key}
                        onChange={(e) => updateSpec(index, 'key', e.target.value)}
                        className="flex-1"
                     />
                     <Input
                        placeholder="Value (e.g. 10,000 km)"
                        value={spec.value}
                        onChange={(e) => updateSpec(index, 'value', e.target.value)}
                        className="flex-1"
                     />
                     <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpec(index)}
                        className="shrink-0"
                     >
                        <X className="h-4 w-4" />
                     </Button>
                  </div>
               ))}
            </div>
            <p className="text-xs text-muted-foreground">
               Add key-value pairs like Mileage, Fuel Type, Transmission, etc.
            </p>
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
