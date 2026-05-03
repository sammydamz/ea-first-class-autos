/** @type {import('next').NextConfig} */

module.exports = {
    allowedDevOrigins: ['192.168.100.19'],
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
    async redirects() {
        return [
            {
                source: '/product',
                destination: '/products',
                permanent: true,
            },
        ]
    },
}
