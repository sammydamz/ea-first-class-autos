'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { MessageCircle, MousePointerClick, LayoutList } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'

interface PerCarStat {
  carId: string
  carTitle: string
  carSlug: string
  carImage: string | null
  clicks: number
}

interface Stats {
  totalClicks: number
  cardClicks: number
  detailClicks: number
  perCar: PerCarStat[]
}

const columns: ColumnDef<PerCarStat>[] = [
  {
    accessorKey: 'carImage',
    header: '',
    cell: ({ row }) => {
      const src = row.original.carImage
      if (!src) return <div className="h-10 w-14 rounded bg-muted" />
      return (
        <div className="relative h-10 w-14 rounded overflow-hidden bg-muted">
          <Image
            src={src}
            alt={row.original.carTitle}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'carTitle',
    header: 'Car',
  },
  {
    accessorKey: 'clicks',
    header: 'WhatsApp Clicks',
    cell: ({ row }) => (
      <span className="font-semibold">{row.original.clicks}</span>
    ),
  },
]

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/analytics/whatsapp-stats')
        const data = await res.json()
        setStats(data)
      } catch (e) {
        console.error('Failed to fetch stats', e)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-4">
        <Heading
          title="WhatsApp Analytics"
          description="Track enquiry button clicks from your storefront"
        />
        <Separator />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Clicks
              </CardTitle>
              <MousePointerClick className="h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '—' : stats?.totalClicks ?? 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Card Clicks
              </CardTitle>
              <LayoutList className="h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '—' : stats?.cardClicks ?? 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Detail Page Clicks
              </CardTitle>
              <MessageCircle className="h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '—' : stats?.detailClicks ?? 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          {stats && stats.perCar.length > 0 ? (
            <DataTable columns={columns} data={stats.perCar} searchKey="carTitle" />
          ) : (
            <div className="text-center py-10 text-neutral-500">
              {loading ? 'Loading...' : 'No WhatsApp clicks recorded yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
