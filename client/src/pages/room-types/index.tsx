import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Appbar, Footer, RoomTypeCard, Seo } from "@/components/shared"
import { RoomTypeProps } from "@/types"
import { endpoints } from "@/config"
import { instance } from "@/lib"

const RoomTypes = () => {
	const { data } = useQuery({
		queryFn: () => instance.get(`${endpoints().room_type.find_all}`),
		queryKey: ["get-room-types"],
	})

	const [roomTypes, setRoomTypess] = useState<RoomTypeProps[]>([])
	useEffect(() => {
		if (data) {
			setRoomTypess(data?.data.data)
		}
	}, [data])

	return (
		<>
			<Seo title="Room Types" />
			<Appbar />
			<main className="w-full">
				<div className="grid min-h-[50vh] w-full place-items-center bg-black/50 bg-hero bg-cover bg-center bg-no-repeat bg-blend-multiply">
					<div className="grid h-full w-full max-w-[1200px] place-items-center px-4 text-center text-white lg:px-0">
						<h1 className="text-3xl lg:text-7xl">Check out our amazing room types</h1>
					</div>
				</div>
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="flex w-full max-w-[1200px] flex-col items-center gap-6 px-4 text-center text-white lg:px-0">
						<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
							{roomTypes.map((roomType) => (
								<RoomTypeCard key={roomType._id} roomType={roomType} />
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default RoomTypes
