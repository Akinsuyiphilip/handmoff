export interface CreateRoomDto {
	name: string
	price: number
	description: string
	features: string[]
	images: Express.Multer.File[]
	room_type: string
}

export interface UpdateRoomDto extends CreateRoomDto {
	id: string
}

export interface BookRoomDto {
	book: boolean
	checkIn: Date | null
	checkOut: Date | null
	id: string
	name: string
	email: string
	occupants: number
	phone: string
}
