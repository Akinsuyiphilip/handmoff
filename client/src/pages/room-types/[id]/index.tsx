import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

import { Appbar, Footer, RoomCard, Seo } from "@/components/shared"
import { RoomProps } from "@/types"
import { endpoints } from "@/config"
import { instance } from "@/lib"

const Rooms = () => {
	const router = useRouter()
	const { id } = router.query

	const { data } = useQuery({
		queryFn: () => instance.get(`${endpoints(String(id)).room.find_by_type}`),
		queryKey: ["get-rooms-by-type", id],
		enabled: !!id,
	})

	const [rooms, setRooms] = useState<RoomProps[]>([])
	useEffect(() => {
		if (data) {
			setRooms(data?.data.data)
		}
	}, [data])

	return (
		<>
			<Seo title="Room Types" />
			<Appbar />
			<main className="w-full">
				<div className="grid min-h-[50vh] w-full place-items-center bg-black/50 bg-hero bg-cover bg-center bg-no-repeat bg-blend-multiply">
					<div className="grid h-full w-full max-w-[1200px] place-items-center px-4 text-center text-white lg:px-0">
						<h1 className="text-3xl lg:text-7xl">Check out our amazing rooms</h1>
					</div>
				</div>
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="flex w-full max-w-[1200px] flex-col items-center gap-6 px-4 text-center text-white lg:px-0">
						<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
							{rooms.map((room) => (
								<RoomCard key={room._id} room={room} />
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Rooms
