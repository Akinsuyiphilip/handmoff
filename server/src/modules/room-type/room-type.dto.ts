export interface CreateRoomTypeDto {
	name: string
	description: string
	image: Express.Multer.File
}

export interface UpdateRoomTypeDto extends CreateRoomTypeDto {
	id: string
}
