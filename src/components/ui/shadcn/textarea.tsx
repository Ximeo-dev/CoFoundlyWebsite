import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
		<textarea
			data-slot='textarea'
			className={cn(
				'border-border placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-within:border-neutral-700 dark:focus-within:border-white/20 hover:border-neutral-700 dark:hover:border-white/20 transition-all duration-300',
				className
			)}
			{...props}
		/>
	)
}

export { Textarea }
