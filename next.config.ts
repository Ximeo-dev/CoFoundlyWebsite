import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.yandexcloud.net',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cofoundly-api.infinitum.su',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
