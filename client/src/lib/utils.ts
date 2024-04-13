import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value)
}

export const formatDate = (date: string) => {
	return new Intl.DateTimeFormat("en-NG", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(date))
}

export const calculateStay = (checkIn: string, checkOut: string) => {
	const checkInDate = new Date(checkIn)
	const checkOutDate = new Date(checkOut)
	const differenceInTime = checkOutDate.getTime() - checkInDate.getTime()
	return Math.floor(differenceInTime / (1000 * 60 * 60 * 24))
}
