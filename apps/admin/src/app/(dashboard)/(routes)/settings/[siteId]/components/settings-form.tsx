'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { toast } from 'react-hot-toast'

interface Props {
   settings: {
      id: string
      businessName: string | null
      businessAddress: string | null
      businessPhone: string | null
      businessEmail: string | null
      defaultWhatsApp: string | null
   } | null
}

export function SettingsForm({ settings }: Props) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState({
      businessName: settings?.businessName || '',
      businessAddress: settings?.businessAddress || '',
      businessPhone: settings?.businessPhone || '',
      businessEmail: settings?.businessEmail || '',
      defaultWhatsApp: settings?.defaultWhatsApp || '',
   })

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      try {
         const res = await fetch('/api/settings', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         })
         if (!res.ok) throw new Error()
         toast.success('Settings updated!')
         router.refresh()
      } catch {
         toast.error('Failed to update settings')
      } finally {
         setLoading(false)
      }
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
         <div className="space-y-2">
            <Label>Business Name</Label>
            <Input value={data.businessName} onChange={(e) => setData({ ...data, businessName: e.target.value })} />
         </div>
         <div className="space-y-2">
            <Label>Address</Label>
            <Input value={data.businessAddress} onChange={(e) => setData({ ...data, businessAddress: e.target.value })} />
         </div>
         <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={data.businessPhone} onChange={(e) => setData({ ...data, businessPhone: e.target.value })} />
         </div>
         <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={data.businessEmail} onChange={(e) => setData({ ...data, businessEmail: e.target.value })} />
         </div>
         <div className="space-y-2">
            <Label>Default WhatsApp Number</Label>
            <Input value={data.defaultWhatsApp} onChange={(e) => setData({ ...data, defaultWhatsApp: e.target.value })} placeholder="1234567890" />
         </div>
         <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Settings'}
         </Button>
      </form>
   )
}
