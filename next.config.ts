/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pokemontcg.io',
      },
    ],
  },
  // 允許從其他裝置訪問開發伺服器
  allowedDevOrigins: ['192.168.50.216'],
};

export default nextConfig;