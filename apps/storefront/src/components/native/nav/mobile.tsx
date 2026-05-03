'use client'

import { useState } from 'react'
import Config from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const navLinks = [
   { href: '/cars', label: 'Cars' },
   { href: '/about', label: 'About' },
]

export function MobileNav() {
   const [open, setOpen] = useState(false)

   return (
      <div className="flex items-center justify-between w-full md:hidden px-2">
         <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  className="min-h-[44px] min-w-[44px]"
               >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
               </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
               <SheetTitle className="sr-only">Navigation</SheetTitle>
               <div className="flex flex-col gap-6 pt-6">
                  <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                     <Image
                        src="/ea.jpg"
                        alt={Config.name}
                        width={46}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                     />
                  </Link>
                  <nav className="flex flex-col gap-1">
                     {navLinks.map((link) => (
                        <Link
                           key={link.href}
                           href={link.href}
                           onClick={() => setOpen(false)}
                           className="px-3 py-3 text-base font-medium rounded-md hover:bg-muted transition-colors"
                        >
                           {link.label}
                        </Link>
                     ))}
                  </nav>
               </div>
            </SheetContent>
         </Sheet>

         <Link href="/" className="flex items-center justify-center shrink-0 outline-none">
            <Image
               src="/ea.jpg"
               alt={Config.name}
                width={70}
                height={60}
                className="h-[clamp(2.5rem,10vw,3.5rem)] w-auto object-contain"
               priority
            />
         </Link>

         <div className="w-[44px]" />
      </div>
   )
}
