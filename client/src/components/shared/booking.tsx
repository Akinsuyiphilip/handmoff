import { useMutation } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import { toast } from "sonner"

import { calculateStay, formatCurrency, instance } from "@/lib"
import { queryClient } from "@/components/providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HttpError, RoomProps } from "@/types"
import { Spinner } from "@/components/shared"
import { endpoints } from "@/config"

interface Props {
	onClose: () => void
	room: RoomProps
}

const initialValues = { book: false, checkIn: "", checkOut: "" }

export const Booking = ({ onClose, room }: Props) => {
	const today = new Date().toISOString().split("T")[0]
	const [lengthOfStay, setLenghtOfStay] = useState(1)

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: typeof initialValues) =>
			instance.put(`${endpoints(String(room._id)).room.book}`, payload),
		mutationKey: ["book"],
		onSuccess: ({ data }) => {
			const { message } = data
			toast.success(message)
			onClose()
			queryClient.invalidateQueries({ queryKey: ["get-room"] })
		},
		onError: ({ response }: HttpError) => {
			const { message } = response.data
			toast.error(message)
		},
	})

	const { handleChange, handleSubmit, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			const payload = { ...values, book: !room.booked }
			mutateAsync(payload)
		},
	})

	useEffect(() => {
		const days = calculateStay(values.checkIn, values.checkOut)
		setLenghtOfStay(days)
	}, [values.checkIn, values.checkOut])

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<p className="text-3xl font-medium">Book Room</p>
			<p className="text-2xl font-bold capitalize">{room.name}</p>
			{!room.booked && (
				<p className="text-xl font-bold">
					{lengthOfStay} day(s) for {formatCurrency(lengthOfStay * room.price)}
				</p>
			)}
			{room.booked ? (
				<form
					onSubmit={handleSubmit}
					className="flex w-full items-center justify-center">
					<Button type="submit" className="w-[200px]">
						{isPending ? <Spinner variant="white" /> : "Unbook"}
					</Button>
				</form>
			) : (
				<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
					<div className="grid w-full grid-cols-2 items-center gap-4">
						<div className="w-full">
							<Label htmlFor="checkIn">Check-In Date</Label>
							<Input type="date" name="checkIn" onChange={handleChange} min={today} />
						</div>
						<div className="w-full">
							<Label htmlFor="checkOut">Check-Out Date</Label>
							<Input
								type="date"
								name="checkOut"
								onChange={handleChange}
								min={values.checkIn}
							/>
						</div>
					</div>
					<div className="grid w-full grid-cols-2 items-center gap-4">
						<Button
							type="button"
							variant="destructive"
							onClick={onClose}
							className="w-[200px]">
							Close
						</Button>
						<Button type="submit" className="w-[200px]">
							{isPending ? <Spinner variant="white" /> : "Book"}
						</Button>
					</div>
				</form>
			)}
		</div>
	)
}
