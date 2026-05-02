/** @type {import('next').NextConfig} */

module.exports = {
   turbopack: {
      root: '../..',
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
}
