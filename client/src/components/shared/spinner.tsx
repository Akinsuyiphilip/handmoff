import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

interface Props extends VariantProps<typeof spinnerVariants> {
	className?: string
}

const spinnerVariants = cva("size-5 rounded-full animate-spin", {
	variants: {
		variant: {
			primary: "border-hm-dark border-t-transparent",
			secondary: "border-hm-secondary border-t-transparent",
			white: "border-hm-light border-t-transparent",
		},
		size: {
			sm: "size-4 border",
			md: "size-5 border-2",
			lg: "size-6 border-4",
			xl: "size-7 border-6",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
})

export const Spinner = ({ className, size, variant }: Props) => {
	return (
		<div className={cn(spinnerVariants({ className, size, variant }))}></div>
	)
}
