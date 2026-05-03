import { Separator } from '@/components/native/separator'
import config from '@/config/site'
import { Facebook, Instagram, Send, MessageCircle, Music2 } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
   { label: 'Facebook', href: '#', icon: Facebook },
   { label: 'TikTok', href: '#', icon: Music2 },
   { label: 'Instagram', href: '#', icon: Instagram },
   { label: 'Telegram', href: '#', icon: Send },
   { label: 'WhatsApp', href: '#', icon: MessageCircle },
]

export default function Footer() {
   return (
      <footer className="w-full bg-neutral-900 text-white pb-8">
         <div className="flex flex-col md:flex-row justify-between gap-8 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] py-10">
            <Trademark />
            <Links />
         </div>
         <Socials />
      </footer>
   )
}

function Links() {
   return (
      <div className="text-center md:text-end">
         <h2 className="mb-3 text-sm uppercase">Quick Links</h2>
         <ul className="flex flex-row md:flex-col gap-4 md:gap-1 justify-center md:block">
            <li>
               <Link
                  href="/cars"
                  className="text-sm transition duration-300 text-white/70 hover:text-white"
               >
                  Cars
               </Link>
            </li>
            <li>
               <Link
                  href="/about"
                  className="text-sm transition duration-300 text-white/70 hover:text-white"
               >
                  About
               </Link>
            </li>
         </ul>
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
            <span className="mt-2 text-sm text-white/70">
               &copy; {new Date().getFullYear()} {config.name}. All Rights
               Reserved.
            </span>
         </span>
      </div>
   )
}

function Socials() {
   return (
      <div className="mb-6 flex justify-center space-x-6 text-white/70">
         {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
               key={label}
               href={href}
               target="_blank"
               rel="noreferrer"
               className="transition duration-300 hover:text-white"
            >
               <Icon className="h-4" />
               <span className="sr-only">{label}</span>
            </a>
         ))}
      </div>
   )
}
