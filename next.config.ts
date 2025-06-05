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
				hostname: 'api.co-foundly.ru',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
