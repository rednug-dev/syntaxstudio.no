import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
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
      { source: '/about-us', destination: '/studio', permanent: true },
      { source: '/en/about-us', destination: '/en/studio', permanent: true },
      { source: '/book', destination: '/contact', permanent: true },
      { source: '/en/book', destination: '/en/contact', permanent: true },
      { source: '/services', destination: '/work', permanent: true },
      { source: '/en/services', destination: '/en/work', permanent: true },
      { source: '/en/blog', destination: '/blog', permanent: true },
      { source: '/en/blog/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/pricing', destination: '/contact', permanent: true },
      { source: '/en/pricing', destination: '/en/contact', permanent: true },
      {
        source: '/blog/ostbanehallen-westerlin-bjorndalen',
        destination: '/blog/eventproduksjon-ostbanehallen',
        permanent: true,
      },
      // FCR-casen er fjernet fra siden — send den indekserte URL-en til /services
      // i stedet for å la den bli en 404.
      { source: '/work/fcr', destination: '/work', permanent: true },
      { source: '/en/work/fcr', destination: '/en/work', permanent: true },
      // Burger-casen er avidentifisert og ligger nå på /work/burger.
      { source: '/work/jonk', destination: '/work/burger', permanent: true },
      { source: '/en/work/jonk', destination: '/en/work/burger', permanent: true },
      // Samarbeidsposten er tatt ned fra bloggen.
      { source: '/blog/samarbeid-med-jonk', destination: '/blog', permanent: true },
      { source: '/en/blog/samarbeid-med-jonk', destination: '/en/blog', permanent: true },
      { source: '/no', destination: '/', permanent: true },
      { source: '/no/:path*', destination: '/:path*', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
