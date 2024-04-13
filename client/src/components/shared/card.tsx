import Image from "next/image"
import Link from "next/link"
import React from "react"

import { formatCurrency } from "@/lib"
import { RoomProps } from "@/types"

interface Props {
	room: RoomProps
}

export const Card = ({ room }: Props) => {
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
					className="rounded-xl object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
				/>
			</div>
			<div className="flex w-full items-center justify-between text-hm-dark">
				<p className="text-sm font-medium capitalize">{room.name}</p>
				<p className="text-sm">{formatCurrency(room.price)}</p>
			</div>
		</Link>
	)
}
