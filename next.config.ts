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
  async redirects() {
    return [
      { source: '/pricing', destination: '/services', permanent: true },
      { source: '/:locale(en|no)/pricing', destination: '/:locale/services', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
