'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export function AdminLoginForm() {
   const router = useRouter()
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState({ email: '', password: '' })

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
         const res = await fetch('/api/auth/admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         })

         if (!res.ok) {
            throw new Error('Invalid credentials')
         }

         toast.success('Logged in!')
         router.push('/')
         router.refresh()
      } catch (error) {
         toast.error('Invalid email or password')
      } finally {
         setLoading(false)
      }
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <div className="space-y-2">
            <Label>Email</Label>
            <Input
               type="email"
               value={data.email}
               onChange={(e) => setData({ ...data, email: e.target.value })}
               required
            />
         </div>
         <div className="space-y-2">
            <Label>Password</Label>
            <Input
               type="password"
               value={data.password}
               onChange={(e) => setData({ ...data, password: e.target.value })}
               required
            />
         </div>
         <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
         </Button>
      </form>
   )
}