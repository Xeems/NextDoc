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
            {
                protocol: 'https',
                hostname: 'NextDocBlob.public.blob.vercel-storage.com',
                port: '',
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
