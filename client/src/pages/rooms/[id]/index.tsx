import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Image from "next/image"

import { Appbar, Booking, Footer, Seo } from "@/components/shared"
import { formatCurrency, instance } from "@/lib"
import { Button } from "@/components/ui/button"
import { endpoints } from "@/config"
import { RoomProps } from "@/types"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

const StatusIndicator = {
	false: "bg-green-200 text-green-600",
	true: "bg-red-200 text-red-600",
}

const Room = () => {
	const [currentImage, setCurrentImage] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const { id } = router.query

	const { data } = useQuery({
		queryFn: () => instance.get(`${endpoints(String(id)).room.find_one}`),
		queryKey: ["get-room", id],
		enabled: !!id,
	})

	const [room, setRoom] = useState<RoomProps>()
	useEffect(() => {
		if (data) {
			setRoom(data?.data.data)
		}
	}, [data])

	if (!room) return null

	return (
		<>
			<Seo />
			<Appbar dark />
			<main className="w-full">
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="flex w-full max-w-[1200px] flex-col items-center gap-6 px-4 text-center text-hm-dark lg:px-0">
						<div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
							<div className="flex w-full flex-col gap-5">
								<div className="relative aspect-[3/2] w-full rounded-2xl">
									<Image
										src={currentImage || room.images[0]}
										alt={room.name}
										fill
										sizes="(max-width;1024px) 100%"
										className="rounded-2xl object-cover transition-all duration-500"
									/>
								</div>
								<div className="flex items-center gap-4">
									{room.images.map((image) => (
										<div
											key={image}
											onClick={() => setCurrentImage(image)}
											className="aspect-quare relative size-20 cursor-pointer rounded-md">
											<Image
												src={image}
												alt={image}
												fill
												sizes="(max-width;1024px) 100%"
												className="rounded-md object-cover"
											/>
										</div>
									))}
								</div>
							</div>
							<div className="flex w-full flex-col items-start gap-5 text-left">
								<div
									className={`w-fit rounded px-2 py-1 ${StatusIndicator[room.booked ? "true" : "false"]}`}>
									<p>{room.booked ? "Booked" : "Unbooked"}</p>
								</div>
								<h3 className="text-3xl capitalize lg:text-6xl">{room.name}</h3>
								<h4 className="text-2xl lg:text-4xl">
									{formatCurrency(room.price)}{" "}
									<span className="font-base text-sm font-medium">per night</span>
								</h4>
								<div className="flex flex-col">
									<h5 className="text-xl lg:text-2xl">Description</h5>
									<p className="font-medium first-letter:capitalize lg:text-xl">
										{room.description}
									</p>
								</div>
								<div className="flex flex-col">
									<h5 className="text-xl lg:text-2xl">Features</h5>
									<p className="font-medium capitalize lg:text-xl">{room.features[0]}</p>
								</div>
								<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
									<DialogTrigger asChild>
										<Button>{room.booked ? "Unbook Room" : "Book Room"}</Button>
									</DialogTrigger>
									<DialogContent>
										<Booking onClose={() => setIsOpen(!isOpen)} room={room} />
									</DialogContent>
								</Dialog>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Room
