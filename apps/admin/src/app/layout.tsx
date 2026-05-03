import { ModalProvider } from '@/providers/modal-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'EA First Class Autos — Admin',
   description: 'Admin dashboard for EA First Class Autos inventory management',
   icons: {
      icon: '/favicon.ico',
   },
}

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
               <ToastProvider />
               <ModalProvider />
               {children}
            </ThemeProvider>
         </body>
      </html>
   )
}
