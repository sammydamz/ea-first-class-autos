'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'

interface FilterProps {
   brands: { id: string; title: string }[]
}

export function HomepageFilter({ brands }: FilterProps) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const [brand, setBrand] = useState(searchParams.get('brand') || '')
   const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
   const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
   const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

   const applyFilters = useCallback(() => {
      const params = new URLSearchParams()
      if (brand) params.set('brand', brand)
      if (minPrice) params.set('minPrice', minPrice)
      if (maxPrice) params.set('maxPrice', maxPrice)
      if (sort && sort !== 'newest') params.set('sort', sort)
      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
   }, [router, pathname, brand, minPrice, maxPrice, sort])

   const clearFilters = useCallback(() => {
      setBrand('')
      setMinPrice('')
      setMaxPrice('')
      setSort('newest')
      router.push(pathname)
   }, [router, pathname])

   return (
      <div className="bg-neutral-50 p-4 rounded-lg mb-6">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
               <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger>
                     <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                     {brands.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                           {b.title}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
            <div>
               <Input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
               />
            </div>
            <div>
               <Input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
               />
            </div>
            <div>
               <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger>
                     <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="newest">Newest</SelectItem>
                     <SelectItem value="price-low">Price: Low to High</SelectItem>
                     <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>
         <div className="flex gap-2 mt-4">
            <Button onClick={applyFilters}>Apply Filters</Button>
            <Button variant="outline" onClick={clearFilters}>
               Clear
            </Button>
         </div>
      </div>
   )
}
