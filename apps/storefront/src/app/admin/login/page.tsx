'use client'

import { useState } from 'react'
import { loginAdmin } from '@/actions/admin-auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Car } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
   const router = useRouter()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')
      setLoading(true)

      const result = await loginAdmin(email, password)

      if (result?.error) {
         setError(result.error)
         setLoading(false)
         return
      }

      router.push('/admin')
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
         <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
               <div className="flex justify-center mb-4">
                  <div className="bg-primary p-3 rounded-full">
                     <Car className="h-8 w-8 text-white" />
                  </div>
               </div>
               <CardTitle className="text-2xl">Admin Login</CardTitle>
               <CardDescription>
                  Enter your credentials to access the admin dashboard
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                     <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                        {error}
                     </div>
                  )}
                  <div className="space-y-2">
                     <label htmlFor="email" className="text-sm font-medium">
                        Email
                     </label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="password" className="text-sm font-medium">
                        Password
                     </label>
                     <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                     {loading ? 'Logging in...' : 'Login'}
                  </Button>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}