'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function FloatingWhatsApp() {
   const [whatsappNumber, setWhatsappNumber] = useState<string>('')

   useEffect(() => {
      async function fetchConfig() {
         try {
            const res = await fetch('/api/site-config')
            const data = await res.json()
            if (data.defaultWhatsApp) {
               setWhatsappNumber(data.defaultWhatsApp)
            }
         } catch (e) {
            console.error('Failed to fetch site config', e)
         }
      }
      fetchConfig()
   }, [])

   if (!whatsappNumber) return null

   const cleanNumber = whatsappNumber.replace(/\D/g, '')
   const message = encodeURIComponent('Hi, I\'m interested in your cars. What do you have available?')
   const waUrl = `https://wa.me/${cleanNumber}?text=${message}`

   return (
      <Link
         href={waUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-rose-700 md:hidden"
         aria-label="Message us on WhatsApp"
      >
         <MessageCircle className="h-7 w-7" />
      </Link>
   )
}