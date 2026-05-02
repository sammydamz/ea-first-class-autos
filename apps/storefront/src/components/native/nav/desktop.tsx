'use client'

import {
   NavigationMenu,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import config from '@/config/site'
import Link from 'next/link'

export function MainNav() {
   return (
      <div className="hidden md:flex gap-4">
         <Link href="/" className="flex items-center">
            <span className="hidden font-semibold sm:inline-block">
               {config.name}
            </span>
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
            <NavigationMenuItem>
               <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/contact">
                     <div className="font-normal text-foreground/70">
                        Contact
                     </div>
                  </Link>
               </NavigationMenuLink>
            </NavigationMenuItem>
         </NavigationMenuList>
      </NavigationMenu>
   )
}
