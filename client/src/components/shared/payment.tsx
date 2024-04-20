import { usePaystackPayment } from "react-paystack"
import { useRouter } from "next/router"
import { toast } from "sonner"
import React from "react"

import { Button } from "@/components/ui/button"
import { PaystackResponse } from "@/types"
import { encodeQueryParams } from "@/lib"

interface Props {
	amount: number
	email: string
	name: string
	phone: string
}

export const Payment = ({ amount, email, name, phone }: Props) => {
	const router = useRouter()

	const config = {
		amount,
		email,
		phone,
		firstname: name.split(" ")[0],
		lastname: name.split(" ")[1],
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
	}

	const onSuccess = (response: PaystackResponse) => {
		toast.success("Payment made!")
		const data = encodeQueryParams(response)
		router.push(`/reciept?${data}`)
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
