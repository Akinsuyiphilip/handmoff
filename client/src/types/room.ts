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
}
