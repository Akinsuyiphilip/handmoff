import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

import { calculateStay, formatCurrency, formatDate, instance } from "@/lib"
import { Appbar, Footer, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { BookingProps } from "@/types"
import { endpoints } from "@/config"

const Booking = () => {
	const [stay, setStay] = useState(0)
	const router = useRouter()
	const { id } = router.query

	const { data } = useQuery({
		queryFn: () => instance.get(`${endpoints(String(id)).booking.find_one}`),
		queryKey: ["get-booking"],
	})

	const [booking, setBooking] = useState<BookingProps>()
	useEffect(() => {
		if (data) {
			setBooking(data?.data.data)
		}
	}, [data])

	useEffect(() => {
		if (booking?.room?.checkIn && booking?.room?.checkOut) {
			const checkIn = booking.room.checkIn.toString()
			const checkOut = booking.room.checkOut.toString()
			const stay = calculateStay(checkIn, checkOut)
			setStay(stay)
		}
	}, [booking?.room.checkIn, booking?.room.checkOut])

	if (!booking) return null

	return (
		<>
			<Seo title="Booking" />
			<Appbar />
			<main className="w-full">
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="flex min-h-[500px] w-full max-w-[1200px] flex-col gap-20 px-4 text-hm-dark lg:px-0">
						<Button onClick={() => router.back()} size="sm" className="w-[100px]">
							Back
						</Button>
						<div className="flex w-full flex-col items-center gap-10">
							<h3 className="text-2xl lg:text-4xl">Booking Details</h3>
							<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
								<div className="w-full">
									<p className="text-gray-500">Guest Name</p>
									<p className="text-lg font-medium">{booking.guest_name}</p>
								</div>
								<div className="w-full">
									<p className="text-gray-500">Guest Email</p>
									<p className="text-lg font-medium">{booking.guest_email}</p>
								</div>
								<div className="w-full">
									<p className="text-gray-500">Guest Phone</p>
									<p className="text-lg font-medium">{booking.guest_phone}</p>
								</div>
								<div className="w-full">
									<p className="text-gray-500">Room</p>
									<p className="text-lg font-medium">{booking.room.name}</p>
								</div>
								<div className="w-full">
									<p className="text-gray-500">Booking Date</p>
									<p className="text-lg font-medium">
										{formatDate(booking.createdAt.toString())}
									</p>
								</div>
								<div className="w-full">
									<p className="text-gray-500">Check-in Date</p>
									<p className="text-lg font-medium">
										{formatDate(booking.room.checkIn?.toString())}
									</p>
								</div>
								<div className="w-full">
									<p className="text-gray-500">Check-out Date</p>
									<p className="text-lg font-medium">
										{formatDate(booking.room.checkOut?.toString())}
									</p>
								</div>
								<div className="w-full">
									<p className="text-gray-500">Total Payment</p>
									<p className="text-lg font-medium">
										{formatCurrency(stay * booking.room.price)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Booking
