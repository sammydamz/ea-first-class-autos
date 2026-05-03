'use client'

import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MessageCircle, MousePointerClick, LayoutList, CalendarIcon } from 'lucide-react'
import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table'
import { format, subDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface PerCarStat {
  carId: string
  carTitle: string
  carSlug: string
  carImage: string | null
  clicks: number
}

interface DailyPoint {
  date: string
  clicks: number
}

interface Stats {
  totalClicks: number
  cardClicks: number
  detailClicks: number
  perCar: PerCarStat[]
  daily: DailyPoint[]
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
  const [source, setSource] = useState<string>('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (source !== 'all') params.set('source', source)
      if (dateRange?.from) params.set('from', dateRange.from.toISOString())
      if (dateRange?.to) params.set('to', dateRange.to.toISOString())
      const qs = params.toString()
      const res = await fetch(`/api/analytics/whatsapp-stats${qs ? `?${qs}` : ''}`)
      const data = await res.json()
      setStats(data)
    } catch (e) {
      console.error('Failed to fetch stats', e)
    } finally {
      setLoading(false)
    }
  }, [source, dateRange])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-4">
        <Heading
          title="WhatsApp Analytics"
          description="Track enquiry button clicks from your storefront"
        />
        <Separator />

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            {(['all', 'card', 'detail'] as const).map((s) => (
              <Button
                key={s}
                variant={source === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSource(s)}
              >
                {s === 'all' ? 'All Sources' : s === 'card' ? 'Card' : 'Detail'}
              </Button>
            ))}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                size="sm"
                className="justify-start text-left font-normal gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'MMM d, yyyy')} –{' '}
                      {format(dateRange.to, 'MMM d, yyyy')}
                    </>
                  ) : (
                    format(dateRange.from, 'MMM d, yyyy')
                  )
                ) : (
                  'Pick a date range'
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={subDays(new Date(), 30)}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
              <div className="flex justify-between p-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDateRange({ from: subDays(new Date(), 7), to: new Date() })
                  }}
                >
                  Last 7 days
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDateRange({ from: subDays(new Date(), 30), to: new Date() })
                  }}
                >
                  Last 30 days
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDateRange(undefined)}
                >
                  Clear
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
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
              <CardTitle className="text-sm font-medium">Card Clicks</CardTitle>
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
              <CardTitle className="text-sm font-medium">Detail Page Clicks</CardTitle>
              <MessageCircle className="h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '—' : stats?.detailClicks ?? 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {stats?.daily && stats.daily.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Daily Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.daily}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(v: string) => {
                        const d = new Date(v)
                        return `${d.getDate()}/${d.getMonth() + 1}`
                      }}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip
                      labelFormatter={(v: string) => {
                        const d = new Date(v)
                        return format(d, 'MMM d, yyyy')
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-2">
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
