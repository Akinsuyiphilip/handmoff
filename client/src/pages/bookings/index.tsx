import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

import { Appbar, Footer, Pagination, Seo } from "@/components/shared"
import { formatDate, instance, paginate } from "@/lib"
import { Button } from "@/components/ui/button"
import { BookingProps } from "@/types"
import { endpoints } from "@/config"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

const PAGE_SIZE = 10

const Bookings = () => {
	const [page, setPage] = useState(1)
	const router = useRouter()

	const { data } = useQuery({
		queryFn: () => instance.get(`${endpoints().booking.find_all}`),
		queryKey: ["get-bookings"],
	})

	const [bookings, setBookings] = useState<BookingProps[]>([])
	useEffect(() => {
		if (data) {
			setBookings(data?.data.data)
		}
	}, [data])

	const items = paginate<BookingProps>(bookings, page, PAGE_SIZE)

	return (
		<>
			<Seo title="Bookings" />
			<Appbar />
			<main className="w-full">
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="w-full max-w-[1200px] px-4 text-hm-dark lg:px-0">
						<div className="flex w-full flex-col gap-10">
							<div className="h-[778px] min-h-[778px] w-full">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Booking ID</TableHead>
											<TableHead>Booking Date</TableHead>
											<TableHead>Guest Name</TableHead>
											<TableHead>Guest Email</TableHead>
											<TableHead>Room</TableHead>
											<TableHead>Check-in Date</TableHead>
											<TableHead>Check-out Date</TableHead>
											<TableHead></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{items.map((booking) => (
											<TableRow key={booking._id}>
												<TableCell>{booking._id.substring(0, 10)}</TableCell>
												<TableCell>{formatDate(booking.createdAt.toString())}</TableCell>
												<TableCell>{booking.guest_name}</TableCell>
												<TableCell>{booking.guest_email}</TableCell>
												<TableCell>{booking.room.name}</TableCell>
												<TableCell>
													{formatDate(booking.room.checkIn?.toString())}
												</TableCell>
												<TableCell>
													{formatDate(booking.room.checkOut?.toString())}
												</TableCell>
												<TableCell>
													<Button onClick={() => router.push(`/bookings/${booking._id}`)}>
														View
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
							<Pagination
								current={page}
								onPageChange={(page) => setPage(page)}
								pageSize={PAGE_SIZE}
								total={bookings.length}
							/>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Bookings
