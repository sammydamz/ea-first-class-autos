'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import { AlertModal } from '@/components/modals/alert-modal'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { useParams } from 'next/navigation'

interface BannerFormProps {
   initialData: any | null
   categories: { id: string; title: string }[]
}

export function BannerForm({ initialData, categories }: BannerFormProps) {
   const router = useRouter()
   const params = useParams()
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState({
      title: initialData?.title || '',
      image: initialData?.image || '',
      description: initialData?.description || '',
      link: initialData?.link || '',
      categoryId: initialData?.categoryId || '',
   })

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         const payload = {
            ...data,
            categoryId: data.categoryId || null,
         }

         if (initialData) {
            const res = await fetch(`/api/banners/${params.bannerId}`, {
               method: 'PATCH',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error()
         } else {
            const res = await fetch('/api/banners', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error()
         }

         toast.success(initialData ? 'Banner updated!' : 'Banner created!')
         router.push('/banners')
         router.refresh()
      } catch {
         toast.error('Something went wrong')
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)
         const res = await fetch(`/api/banners/${params.bannerId}`, {
            method: 'DELETE',
         })
         if (!res.ok) throw new Error()
         toast.success('Banner deleted.')
         router.push('/banners')
         router.refresh()
      } catch {
         toast.error('Something went wrong.')
      } finally {
         setLoading(false)
         setOpen(false)
      }
   }

   return (
      <>
         <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
         <div className="flex items-center justify-between">
            <Heading title={initialData ? 'Edit Banner' : 'Create Banner'} description={initialData ? 'Edit banner details' : 'Add a new banner'} />
            {initialData && (
               <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
                  <Trash className="h-4" />
               </Button>
            )}
         </div>
         <Separator />
         <form onSubmit={handleSubmit} className="space-y-6 w-full mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} required />
               </div>
               <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={data.categoryId} onValueChange={(value) => setData({ ...data, categoryId: value })}>
                     <SelectTrigger>
                        <SelectValue placeholder="Select category (optional)" />
                     </SelectTrigger>
                     <SelectContent>
                        {categories.map((c) => (
                           <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
            </div>
            <div className="space-y-2">
               <Label>Image URL *</Label>
               <Input value={data.image} onChange={(e) => setData({ ...data, image: e.target.value })} placeholder="https://example.com/banner.jpg" required />
            </div>
            <div className="space-y-2">
               <Label>Description</Label>
               <Textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={3} />
            </div>
            <div className="space-y-2">
               <Label>Link</Label>
               <Input value={data.link} onChange={(e) => setData({ ...data, link: e.target.value })} placeholder="https://..." />
            </div>
            <div className="flex gap-4">
               <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Banner'}
               </Button>
               <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
               </Button>
            </div>
         </form>
      </>
   )
}
