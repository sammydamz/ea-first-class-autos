'use client'

import { useState } from 'react'
import Config from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const navLinks = [
   { href: '/cars', label: 'Inventory', desc: 'Browse all vehicles' },
   { href: '/about', label: 'About Us', desc: 'Our story & values' },
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
                  className="min-h-[44px] min-w-[44px] -ml-2"
               >
                  <Menu className="h-[22px] w-[22px]" strokeWidth={1.5} />
                  <span className="sr-only">Menu</span>
               </Button>
            </SheetTrigger>
            <SheetContent
               side="left"
               className="w-[280px] border-0 bg-background/80 backdrop-blur-xl p-0"
            >
               <SheetTitle className="sr-only">Navigation</SheetTitle>
               <SheetDescription className="sr-only">Site navigation menu</SheetDescription>

               <div className="flex flex-col h-full">
                  <div className="px-6 pt-14 pb-6">
                     <Link href="/" onClick={() => setOpen(false)} className="inline-block">
                        <Image
                           src="/ea.jpg"
                           alt={Config.name}
                           width={56}
                           height={48}
                           className="h-12 w-auto object-contain"
                           style={{ width: 'auto', height: 'auto' }}
                           priority
                        />
                     </Link>
                  </div>

                  <div className="mx-6 h-px bg-foreground/10" />

                  <nav className="flex-1 px-3 pt-2">
                     {navLinks.map((link) => (
                        <Link
                           key={link.href}
                           href={link.href}
                           onClick={() => setOpen(false)}
                           className="group flex items-center gap-3 px-3 py-3.5 rounded-xl transition-colors hover:bg-foreground/[0.04]"
                        >
                           <span className="flex flex-col">
                              <span className="text-[15px] font-medium leading-tight">{link.label}</span>
                              <span className="text-xs text-muted-foreground leading-tight mt-0.5">{link.desc}</span>
                           </span>
                        </Link>
                     ))}
                  </nav>

                  <div className="mx-6 h-px bg-foreground/10" />

                  <div className="px-6 py-6">
                     <Link
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-foreground text-background text-sm font-medium transition-opacity hover:opacity-90"
                     >
                        WhatsApp Us
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
