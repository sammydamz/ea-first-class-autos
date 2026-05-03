'use client'

import Config from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'

export function MobileNav() {
   return (
      <div className="flex items-center justify-between w-full md:hidden px-2">
         <div className="flex items-center gap-2 w-1/3">
            <Link
               href="/cars"
               className="px-3 py-1.5 text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
               Cars
            </Link>
            <Link
               href="/about"
               className="px-3 py-1.5 text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
               About
            </Link>
         </div>
         <Link href="/" className="flex items-center justify-center w-1/3 outline-none">
            <Image
               src="/ea.jpg"
               alt={Config.name}
               width={70}
               height={60}
               className="object-contain"
               priority
            />
         </Link>
         <div className="w-1/3" />
      </div>
   )
}
