'use client'

import { useCallback } from 'react'

export function WhatsAppCardButton({ carId, href }: { carId: string; href: string }) {
  const handleClick = useCallback(() => {
    fetch('/api/analytics/whatsapp-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carId, source: 'card' }),
    }).catch(() => {})
  }, [carId])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="p-1.5 sm:p-2 rounded-full hover:bg-green-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
    >
      <img src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000" alt="WhatsApp" className="h-6 w-6" />
    </a>
  )
}
