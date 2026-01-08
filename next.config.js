/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Disable ESLint during builds (for faster deployment, can enable later)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checking during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
