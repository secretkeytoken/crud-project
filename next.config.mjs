/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.externals.push(
      'pino-pretty',
      'lokijs',
      // "crypto",
      'http',
      'https',
      'crypto-browserify'
    );
    return config;
  },
  transpilePackages: ['crypto-js'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        hostname: 'gateway.irys.xyz',
        protocol: 'https',
      },
      {
        hostname: 'arweave.net',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
