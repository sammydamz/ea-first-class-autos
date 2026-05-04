'use client'

import { useState } from 'react'
import Config from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const navLinks = [
   { href: '/', label: 'Home' },
   { href: '/cars', label: 'Inventory' },
   { href: '/about', label: 'About Us' },
]

export function MobileNav() {
   const [open, setOpen] = useState(false)

   return (
      <div className="flex items-center justify-between w-full md:hidden">
         <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  className="min-h-[44px] min-w-[44px] -ml-2 rounded-none"
               >
                  <Menu className="h-[22px] w-[22px]" strokeWidth={1.5} />
                  <span className="sr-only">Menu</span>
               </Button>
            </SheetTrigger>
            <SheetContent
               side="left"
               className="w-[280px] border-r-2 border-black bg-white p-0 rounded-none [&>button]:text-white [&>button]:hover:text-white [&>button]:opacity-100"
            >
               <SheetTitle className="sr-only">Navigation</SheetTitle>
               <SheetDescription className="sr-only">Site navigation menu</SheetDescription>

               <div className="flex flex-col h-full">
                   <div className="bg-black px-6 py-3 flex items-center">
                      <Link href="/" onClick={() => setOpen(false)} className="inline-block">
                         <Image
                            src="/ea.jpg"
                            alt={Config.name}
                            width={140}
                            height={40}
                            className="h-10 w-auto object-contain"
                         />
                      </Link>
                   </div>

                  <div className="h-px bg-black" />

                  <nav className="flex-1">
                     {navLinks.map((link) => (
                        <div key={link.href}>
                           <Link
                              href={link.href}
                              onClick={() => setOpen(false)}
                              className="block px-6 py-4 transition-colors hover:bg-black/[0.03]"
                           >
                              <span className="block text-base font-semibold text-black">
                                 {link.label}
                              </span>
                           </Link>
                           <div className="h-px bg-black/10" />
                        </div>
                     ))}
                  </nav>

                  <div className="px-6 py-6 border-t-2 border-black">
                     <Link
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white text-sm font-bold uppercase tracking-[0.1em] border-2 border-black hover:bg-white hover:text-black transition-colors"
                     >
                        Contact Us
                     </Link>
                  </div>
               </div>
            </SheetContent>
         </Sheet>

         <Link href="/" className="flex items-center justify-center shrink-0 outline-none">
            <Image
               src="/ea.jpg"
               alt={Config.name}
               width={56}
               height={48}
               className="w-auto object-contain"
               style={{ height: 'clamp(2rem, 8vw, 2.75rem)', width: 'auto' }}
               priority
            />
         </Link>

         <div className="w-[44px]" />
      </div>
   )
}
