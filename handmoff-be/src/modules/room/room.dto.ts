export interface CreateRoomDto {
	name: string
	price: number
	description: string
	features: string[]
	images: string[]
}

export interface UpdateRoomDto extends CreateRoomDto {}

export interface BookRoomDto {
	checkIn: Date
	checkOu: Date
}
