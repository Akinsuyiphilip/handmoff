import { usePaystackPayment } from "react-paystack"
import { useRouter } from "next/router"
import { toast } from "sonner"
import React from "react"

import { Button } from "@/components/ui/button"
import { UserProps } from "@/types"

interface Props {
	amount: number
	user: UserProps | null
}

export const Payment = ({ amount, user }: Props) => {
	const router = useRouter()

	const config = {
		amount,
		email: String(user?.email),
		firstname: String(user?.name.split(" ")[0]),
		lastname: String(user?.name.split(" ")[1]),
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
	}

	const onSuccess = () => {
		toast.success("Payment made!")
		router.push("/")

	}

	const onClose = () => {
		toast.error("An error occurred!")
	}

	const initializePayment = usePaystackPayment(config)

	return (
		<Button onClick={() => initializePayment({ onSuccess, onClose })}>
			Pay with Paystack
		</Button>
	)
}
