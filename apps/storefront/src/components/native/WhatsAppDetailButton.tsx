'use client'

import { Button } from '@/components/ui/button'
import { useCallback } from 'react'

export function WhatsAppDetailButton({
  carId,
  href,
}: {
  carId: string
  href: string
}) {
  const handleClick = useCallback(() => {
    fetch('/api/analytics/whatsapp-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carId, source: 'detail' }),
    }).catch(() => {})
  }, [carId])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex justify-center"
    >
      <Button className="w-auto min-h-[44px] gap-2">
        <img
          src="https://img.icons8.com/?size=100&id=Funux8t3F8Ig&format=png&color=FFFFFF"
          alt=""
          className="h-5 w-5"
        />
        Enquire on WhatsApp
      </Button>
    </a>
  )
}
