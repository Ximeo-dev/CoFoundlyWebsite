import { cn } from '@/lib/utils'

export default function Spinner ({
	size = 24,
	className,
}: {
	size?: number
	className?: string
}) {
	return (
		<div
			className={cn(
				'rounded-full border-t-2 border-white/80 border-r-2 border-b-transparent border-l-transparent animate-spin',
				className
			)}
			style={{
				width: size,
				height: size,
			}}
		/>
	)
}
