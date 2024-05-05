/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = {
    reactStrictMode: false,
    ...nextConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
    },
    // async redirects() {
    //     return [
    //         // Basic redirect
    //         {
    //             source: '/worksapces/:slug/document',
    //             destination: '/worksapces/:slug',
    //             permanent: true,
    //         },
    //     ]
    // },
}
