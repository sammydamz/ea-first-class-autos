/** @type {import('next').NextConfig} */

module.exports = {
   turbopack: {
      root: 'D:\\Damz Proj\\Auto\\next-prisma-tailwind-ecommerce',
   },
   allowedDevOrigins: ['192.168.100.19'],
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
}
