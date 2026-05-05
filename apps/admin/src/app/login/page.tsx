import { AdminLoginForm } from '@/app/login/components/admin-login-form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
   title: 'Admin Login — E.A. First Class Autos',
   description: 'Admin authentication for E.A. First Class Autos',
}

export default function AuthenticationPage() {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
         <Image
            src="/ea.jpg"
            alt="E.A. First Class Autos"
            width={60}
            height={52}
            className="h-12 w-auto object-contain mb-8"
            style={{ width: 'auto', height: 'auto' }}
         />
         <div className="w-full max-w-sm">
            <AdminLoginForm />
         </div>
      </div>
   )
}
