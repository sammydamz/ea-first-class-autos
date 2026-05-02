'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function FloatingWhatsApp() {
   const whatsappNumber = '+1234567890'
   const cleanNumber = whatsappNumber.replace(/\D/g, '')
   const message = encodeURIComponent(
      "Hi, I'm interested in your cars. What do you have available?"
   )
   const waUrl = `https://wa.me/${cleanNumber}?text=${message}`

   return (
      <Link
         href={waUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:bg-primary/90"
         aria-label="Message us on WhatsApp"
      >
         <MessageCircle className="h-7 w-7" />
      </Link>
   )
}
