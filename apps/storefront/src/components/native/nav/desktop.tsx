'use client'

import config from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
   { href: '/', label: 'Home' },
   { href: '/cars', label: 'Inventory' },
   { href: '/about', label: 'About' },
]

export function MainNav() {
   const pathname = usePathname()

   return (
      <div className="hidden md:flex gap-0 items-center">
         <Link href="/" className="flex items-center mr-6">
            <Image
               src="/ea.jpg"
               alt={config.name}
               width={46}
               height={40}
               className="h-8 md:h-10 w-auto object-contain"
               style={{ width: 'auto', height: 'auto' }}
               priority
            />
         </Link>
         <nav className="flex items-center">
            {navLinks.map((link) => {
const isActive = pathname === link.href || (link.href === '/' && pathname === '/')
                      return (
                     <Link
                        key={link.href}
                        href={link.href}
                        className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-[#057dbc] ${isActive ? 'text-[#057dbc]' : 'text-black/70'}`}
                     >
                      {link.label}
                     {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#057dbc]" />
                     )}
                  </Link>
               )
            })}
         </nav>
      </div>
   )
}

export function NavMenu() {
   return null
}
