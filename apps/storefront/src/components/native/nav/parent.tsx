'use client'

import { MainNav } from '@/components/native/nav/desktop'
import { MobileNav } from '@/components/native/nav/mobile'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Header() {
   return (
      <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur mb-4 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
         <div className="flex h-14 items-center">
            <MainNav />
            <MobileNav />
            <div className="flex flex-1 items-center space-x-2 justify-end">
               <ThemeToggle />
            </div>
         </div>
      </header>
   )
}

function ThemeToggle() {
   const { resolvedTheme, setTheme } = useTheme()

   return (
      <Button
         variant="outline"
         size="icon"
         onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
         {resolvedTheme === 'dark' ? (
            <SunIcon className="h-4" />
         ) : (
            <MoonIcon className="h-4" />
         )}
      </Button>
   )
}
