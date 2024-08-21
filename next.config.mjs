/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "firebasestorage.googleapis.com",
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3001",
            },
        ],
        domains: ['firebasestorage.googleapis.com', 'localhost', 'lh3.googleusercontent.com']
    }
};

export default nextConfig;
