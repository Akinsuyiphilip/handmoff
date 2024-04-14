import Image from "next/image"
import Link from "next/link"
import React from "react"

import { RoomProps, RoomTypeProps } from "@/types"
import { formatCurrency } from "@/lib"

interface RoomCardProps {
	room: RoomProps
}

const StatusIndicator = {
	false: "bg-green-500 text-white",
	true: "bg-red-500 text-white",
}

export const RoomCard = ({ room }: RoomCardProps) => {
	return (
		<Link
			href={`/rooms/${room._id}`}
			className="group flex w-full flex-col gap-2">
			<div className="relative aspect-[3/2] w-full rounded-xl">
				<Image
					src={room.images[0]}
					alt={room.name}
					fill
					sizes="(max-width;1024px) 100%"
					className="rounded-xl object-fill grayscale transition-all duration-300 group-hover:grayscale-0"
				/>
				<div
					className={`absolute right-4 top-4 !z-10 w-fit rounded px-2 py-1 text-xs ${StatusIndicator[room.booked ? "true" : "false"]}`}>
					{room.booked ? "Booked" : "Free"}
				</div>
			</div>
			<div className="flex w-full items-center justify-between text-hm-dark">
				<p className="text-sm font-medium capitalize">{room.name}</p>
				<p className="text-sm">{formatCurrency(room.price)}</p>
			</div>
		</Link>
	)
}

interface RoomTypeCardProps {
	roomType: RoomTypeProps
}

export const RoomTypeCard = ({ roomType }: RoomTypeCardProps) => {
	return (
		<Link
			href={`/room-types/${roomType._id}`}
			className="group flex w-full flex-col gap-2">
			<div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl">
				<Image
					src={roomType.image}
					alt={roomType.name}
					fill
					sizes="(max-width;1024px) 100%"
					className="rounded-xl object-fill transition-all duration-300 group-hover:scale-110"
				/>
			</div>
			<div className="flex w-full items-center justify-center text-hm-dark">
				<p className="font-medium capitalize">{roomType.name}</p>
			</div>
		</Link>
	)
}
