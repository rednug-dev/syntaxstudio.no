import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iz6e2iomhf0u9x5o.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*.(webp|jpg|jpeg|png|svg|mp4|webm|woff2|woff)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Burger-casen er avidentifisert og ligger nå på /work/burger.
      { source: '/work/jonk', destination: '/work/burger', permanent: true },
      { source: '/en/work/jonk', destination: '/en/work/burger', permanent: true },
      { source: '/blog/samarbeid-med-jonk', destination: '/blog', permanent: true },
      { source: '/en/blog/samarbeid-med-jonk', destination: '/en/blog', permanent: true },
      { source: '/pricing', destination: '/services', permanent: true },
      { source: '/en/pricing', destination: '/en/services', permanent: true },
      {
        source: '/blog/ostbanehallen-westerlin-bjorndalen',
        destination: '/blog/eventproduksjon-ostbanehallen',
        permanent: true,
      },
      { source: '/no', destination: '/', permanent: true },
      { source: '/no/:path*', destination: '/:path*', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
