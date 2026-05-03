'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MainNav({
   className,
   ...props
}: React.HTMLAttributes<HTMLElement>) {
   const pathname = usePathname()

   const routes = [
      {
         href: `/cars`,
         label: 'Cars',
         active: pathname.includes(`/cars`),
      },
      {
         href: `/brands`,
         label: 'Brands',
         active: pathname.includes(`/brands`),
      },
      {
         href: `/banners`,
         label: 'Banners',
         active: pathname.includes(`/banners`),
      },
      {
         href: `/settings/default`,
         label: 'Settings',
         active: pathname.includes(`/settings`),
      },
   ]

   return (
      <nav
         className={cn('flex items-center gap-1', className)}
         {...props}
      >
         {routes.map((route) => (
            <Link
               key={route.href}
               href={route.href}
               className={cn(
                  'px-3 py-2 text-sm transition-colors border-b-2 hover:text-primary',
                  route.active
                     ? 'border-primary font-semibold text-foreground'
                     : 'border-transparent font-normal text-muted-foreground'
               )}
            >
               {route.label}
            </Link>
         ))}
      </nav>
   )
}
