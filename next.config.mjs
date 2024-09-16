/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "crypto", "http", 'https');
    return config;
  },
  transpilePackages: ["crypto-js"],
};

export default nextConfig;
