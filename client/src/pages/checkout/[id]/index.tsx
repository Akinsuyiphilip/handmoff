import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import QrCode from "react-qr-code"

import { calculateStay, formatCurrency, formatDate, instance } from "@/lib"
import { Appbar, Footer, Payment, Seo } from "@/components/shared"
import { BookingProps } from "@/types"
import { endpoints } from "@/config"

const CheckOut = () => {
	const [lengthOfStay, setLenghtOfStay] = useState(0)
	const router = useRouter()
	const { id } = router.query

	const { data } = useQuery({
		queryFn: () => instance.get(`${endpoints(String(id)).booking.find_one}`),
		queryKey: ["get-room", id],
		enabled: !!id,
	})

	const [booking, setBooking] = useState<BookingProps>()
	useEffect(() => {
		setBooking(data?.data.data)
	}, [data])

	useEffect(() => {
		if (booking?.room?.checkIn && booking?.room.checkOut) {
			const checkIn = booking.room.checkIn.toString()
			const checkOut = booking.room.checkOut.toString()
			const length = calculateStay(checkIn, checkOut)
			setLenghtOfStay(length)
		}
	}, [booking?.room?.checkIn, booking?.room?.checkOut])

	if (!booking) return null

	return (
		<>
			<Seo title="Checkout" />
			<Appbar />
			<main className="w-full">
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="w-full max-w-[1200px] px-4 text-hm-dark lg:px-0">
						<div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
							<div className="flex w-full flex-col gap-10 lg:col-span-2">
								<h3 className="text-3xl lg:text-6xl">Checkout</h3>
								<div className="flex w-full flex-col gap-4">
									<div className="flex w-full flex-col border-b">
										<p className="text-gray-500">Name</p>
										<p className="text-lg font-medium capitalize">{booking.guest_name}</p>
									</div>
									<div className="flex w-full flex-col border-b">
										<p className="text-gray-500">Email</p>
										<p className="text-lg font-medium lowercase">{booking.guest_email}</p>
									</div>
									<div className="flex w-full flex-col border-b">
										<p className="text-gray-500">Phone Number</p>
										<p className="text-lg font-medium lowercase">{booking.guest_phone}</p>
									</div>
									<div className="flex w-full flex-col border-b">
										<p className="text-gray-500">Booking Date Date</p>
										<p className="text-lg font-medium">
											{formatDate(booking.createdAt.toString())}
										</p>
									</div>
									<div className="flex w-full flex-col border-b">
										<p className="text-gray-500">Check-in Date</p>
										<p className="text-lg font-medium">
											{formatDate(booking.room.checkIn?.toString())}
										</p>
									</div>
									<div className="flex w-full flex-col border-b">
										<p className="text-gray-500">Check-out Date</p>
										<p className="text-lg font-medium">
											{formatDate(booking.room.checkOut?.toString())}
										</p>
									</div>
								</div>
								<div className="flex w-full flex-col gap-4">
									<div className="flex flex-col">
										<p className="text-lg font-medium">Name</p>
										<p className="text-gray-500 first-letter:capitalize">
											{booking.room.name}
										</p>
									</div>
									<div className="flex flex-col">
										<p className="text-lg font-medium">Description</p>
										<p className="text-gray-500 first-letter:capitalize">
											{booking.room.description}
										</p>
									</div>
									<div className="flex flex-col">
										<p className="text-lg font-medium">Features</p>
										<ul className="flex list-disc flex-col items-start gap-1 pl-5">
											{booking.room.features.map((feature, index) => (
												<li key={index} className="capitalize text-gray-500">
													{feature}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className="flex h-fit w-full flex-col gap-10">
								<div className="h-fit w-full border bg-white">
									<div className="w-full p-4">
										<QrCode value="" className="aspect-square w-full" />
									</div>
									<div className="flex w-full flex-col gap-2 bg-black p-4 text-white">
										<div className="flex w-full items-center justify-between">
											<p className="text-gray-200">Number of guests</p>
											<p className="font-medium">{booking.occupants}</p>
										</div>
										<div className="flex w-full items-center justify-between">
											<p className="text-gray-200">{lengthOfStay} day(s)</p>
											<p className="font-medium">
												{formatCurrency(lengthOfStay * booking.room.price)}
											</p>
										</div>
										<div className="flex w-full items-center justify-between">
											<p className="text-gray-200">VAT & Tax</p>
											<p className="font-medium">{formatCurrency(0)}</p>
										</div>
										<hr className="my-1" />
										<div className="flex w-full items-center justify-between text-lg">
											<p className="text-gray-200">Total</p>
											<p className="font-medium">
												{formatCurrency(lengthOfStay * booking.room.price)}
											</p>
										</div>
									</div>
								</div>
								<Payment
									amount={lengthOfStay * booking.room.price * 100}
									email={booking.guest_email}
									name={booking.guest_name}
									phone={booking.guest_phone}
								/>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default CheckOut
