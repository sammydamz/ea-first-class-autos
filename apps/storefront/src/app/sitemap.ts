import prisma from '@/lib/prisma'

const URL = process.env.NEXT_PUBLIC_URL || 'https://eafirstclassautos.com'

export default async function sitemap() {
   const cars = (await prisma.car.findMany({
      where: { isDeleted: false },
   })).map(({ slug, updatedAt }) => ({
      url: `${URL}/cars/${slug}`,
      lastModified: updatedAt,
   }))

   const routes = ['', '/cars', '/about', '/contact'].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
   }))

   return [...routes, ...cars]
}