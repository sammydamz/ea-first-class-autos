'use client'

import { MainNav } from '@/components/native/nav/desktop'
import { MobileNav } from '@/components/native/nav/mobile'

export default function Header() {
   return (
      <header className="sticky top-0 z-[40] w-full">
         <div className="bg-black py-1.5 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            <div className="flex items-center justify-between">
               <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/60">
                  Ghana's Trusted Auto Dealer
               </span>
               <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 hidden sm:block">
                  Quality &bull; Trust &bull; Value
               </span>
            </div>
         </div>
         <div className="border-b-2 border-black bg-white px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            <div className="flex min-h-14 items-center justify-between">
               <MainNav />
               <MobileNav />
            </div>
         </div>
      </header>
   )
}
