import { Document, ObjectId } from "mongoose"
import { Request } from "express"

export interface UserProps extends Document {
	email: string
	id: ObjectId | string
	name: string
	password: string
	username: string
}

export interface RoomProps extends Document {
	id: ObjectId | string
	name: string
	price: number
	description: string
	features: string[]
	images: string[]
	room_type: RoomTypeProps
	booked: boolean
	checkIn: Date | null
	checkOut: Date | null
}

export interface RoomTypeProps extends Document {
	id: ObjectId | string
	name: string
	description: string
	image: string
}

export interface BookingProps extends Document {
	guest_email: string
	guest_name: string
	guest_phone: string
	id: ObjectId | string
	occupants: number
	room: RoomProps
}

export interface DataResponse {
	error: boolean
	message: string
	data?:
		| null
		| string
		| Date
		| boolean
		| number
		| object
		| symbol
		| Array<any>
		| Express.Multer.File
}

export interface JwtResponse {
	id: string
}

export interface ExpressRequest extends Request {
	user?: Document
	token?: string
}

export interface PaginateDto {
	limit?: number
	page?: number
}
