'use client'

import {
   NavigationMenu,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import config from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'

export function MainNav() {
   return (
      <div className="hidden md:flex gap-2 items-center">
         <Link href="/" className="flex items-center">
             <Image
                src="/ea.jpg"
                alt={config.name}
                 width={46}
                 height={40}
                 className="h-8 md:h-10 w-auto object-contain"
               priority
            />
         </Link>
         <NavMenu />
      </div>
   )
}

export function NavMenu() {
   return (
      <NavigationMenu>
         <NavigationMenuList>
            <NavigationMenuItem>
               <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/cars">
                     <div className="font-normal text-foreground/70">
                        Cars
                     </div>
                  </Link>
               </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/about">
                     <div className="font-normal text-foreground/70">
                        About
                     </div>
                  </Link>
               </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
       </NavigationMenu>
    )
}
