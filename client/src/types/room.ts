import { UserProps } from "."

export type RoomProps = {
	_id: string
	name: string
	price: number
	description: string
	features: string[]
	images: string[]
	booked: boolean
	checkIn?: Date | null
	checkOut?: Date | null
	createdAt: string
	updatedAt: string
}

export type RoomTypeProps = {
	_id: string
	name: string
	description: string
	image: string
}

export type BookingProps = {
	_id: string
	createdAt: Date
	room: RoomProps
	user: UserProps
}
