/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
    },
    // ✅ Add custom headers to prevent caching of the home page
    async headers() {
        return [
            {
                source: '/', // only the home page
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                ],
            },
            // Optional: add for all pages if needed
            // {
            //     source: '/(.*)',
            //     headers: [
            //         {
            //             key: 'Cache-Control',
            //             value: 'no-cache, no-store, must-revalidate',
            //         },
            //     ],
            // },
        ];
    },
};

export default nextConfig;