/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable optimized images for better performance
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable experimental features for better responsiveness
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Optimize for different devices
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
