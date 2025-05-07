import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				'file:text-foreground placeholder:text-muted-foreground  selection:text-primary-foreground dark:bg-input/30 border-border flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-neutral-700 dark:hover:border-white/20 transition-all duration-300',
				'focus-within:border-neutral-700 dark:focus-within:border-white/20',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className
			)}
			{...props}
		/>
	)
}

export { Input }
