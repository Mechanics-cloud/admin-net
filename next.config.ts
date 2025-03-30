import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
        search: '',
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
