import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // NAS / SMB: el file watcher nativo falla (ENOSPC); polling evita caché .next corrupto y 404 en /
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**'],
      }
    }
    return config
  },
}

export default nextConfig
