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
	guest_email: string
	guest_name: string
	guest_phone: string
	occupants: number
	room: RoomProps
}
