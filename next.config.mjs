/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push(
      "pino-pretty",
      "lokijs",
      // "crypto",
      "http",
      "https",
      "crypto-browserify"
    );
    return config;
  },
  transpilePackages: ["crypto-js"],
};

export default nextConfig;
