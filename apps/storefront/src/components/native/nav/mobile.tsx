'use client'

import Config from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'

export function MobileNav() {
   return (
      <div className="flex items-center justify-between w-full md:hidden px-2">
         <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
               href="/cars"
               className="px-2 py-1 sm:px-3 sm:py-1.5 text-small font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
               Cars
            </Link>
            <Link
               href="/about"
               className="px-2 py-1 sm:px-3 sm:py-1.5 text-small font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
               About
            </Link>
         </div>
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
         <div className="w-[88px]" />
      </div>
   )
}
