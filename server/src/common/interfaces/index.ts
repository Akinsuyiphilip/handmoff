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
	booked: boolean
	checkIn: Date | string | null
	checkOut: Date | string | null
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