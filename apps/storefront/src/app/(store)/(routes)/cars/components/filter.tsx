'use client'

import { useRouter, useSearchParams } from 'next/navigation'
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
   categories: { id: string; title: string }[]
}

export function CarsFilter({ brands, categories }: FilterProps) {
   const router = useRouter()
   const searchParams = useSearchParams()

   const [brand, setBrand] = useState(searchParams.get('brand') || '')
   const [category, setCategory] = useState(searchParams.get('category') || '')
   const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
   const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
   const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

   const updateFilter = useCallback((key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
         params.set(key, value)
      } else {
         params.delete(key)
      }
      router.push(`/cars?${params.toString()}`)
   }, [router, searchParams])

   const clearFilters = useCallback(() => {
      setBrand('')
      setCategory('')
      setMinPrice('')
      setMaxPrice('')
      setSort('newest')
      router.push('/cars')
   }, [router])

   return (
      <div className="bg-neutral-50 p-4 rounded-lg mb-6">
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
               <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                     <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                     {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                           {c.title}
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
            <Button
               onClick={() => {
                  if (brand) updateFilter('brand', brand)
                  if (category) updateFilter('category', category)
                  if (minPrice) updateFilter('minPrice', minPrice)
                  if (maxPrice) updateFilter('maxPrice', maxPrice)
                  if (sort && sort !== 'newest') updateFilter('sort', sort)
               }}
            >
               Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters}>
               Clear
            </Button>
         </div>
      </div>
   )
}