import { Separator } from '@/components/native/separator'
import config from '@/config/site'
import { InstagramIcon, PhoneIcon, MailIcon } from 'lucide-react'
import Link from 'next/link'

const data = [
   {
      label: 'QUICK LINKS',
      links: [
         { label: 'Cars', url: '/cars' },
         { label: 'About', url: '/about' },
         { label: 'Contact', url: '/contact' },
      ],
   },
   {
      label: 'CONTACT',
      links: [
         { label: 'Phone', url: 'tel:+1234567890' },
         { label: 'Email', url: 'mailto:info@eafirstclassautos.com' },
         { label: 'WhatsApp', url: 'https://wa.me/1234567890' },
      ],
   },
]

export default function Footer() {
   return (
      <footer className="w-full">
         <Separator className="my-12" />
         <div className="flex flex-col md:flex-row justify-between gap-8 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            <Trademark />
            <Links />
         </div>
         <Separator className="mt-8 mb-6" />
         <Socials />
      </footer>
   )
}

function Links() {
   return (
      <div className="text-end justify-evenly grid grid-cols-2 gap-8">
         {data.map(({ label, links }) => (
            <div key={label}>
               <h2 className="mb-3 text-sm uppercase">{label}</h2>
               <ul className="block space-y-1">
                  {links.map(({ label, url }) => (
                     <li key={label}>
                        <Link
                           href={url}
                           className="text-sm transition duration-300 text-muted-foreground hover:text-foreground"
                        >
                           {label}
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         ))}
      </div>
   )
}

function Trademark() {
   return (
      <div className="mb-6 md:mb-0">
         <span className="flex flex-col">
            <h2 className="whitespace-nowrap text-sm font-semibold uppercase">
               {config.name}
            </h2>
            <span className="mt-2 text-sm text-muted-foreground">
               &copy; {new Date().getFullYear()} {config.name}. All Rights
               Reserved.
            </span>
         </span>
      </div>
   )
}

function Socials() {
   return (
      <div className="mb-6 flex justify-center space-x-6 text-muted-foreground">
         <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
         >
            <PhoneIcon className="h-4" />
            <span className="sr-only">WhatsApp</span>
         </a>
         <a href="mailto:info@eafirstclassautos.com">
            <MailIcon className="h-4" />
            <span className="sr-only">Email</span>
         </a>
         <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
         >
            <InstagramIcon className="h-4" />
            <span className="sr-only">Instagram page</span>
         </a>
      </div>
   )
}
