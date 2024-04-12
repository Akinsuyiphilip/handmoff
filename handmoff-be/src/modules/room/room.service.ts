import { BookRoomDto, CreateRoomDto, UpdateRoomDto } from "./room.dto"
import { DataResponse } from "../../common/interfaces"
import { uploader } from "../../common/helpers"
import { Room } from "../../schema"

export const CreateRoomService = async (payload: CreateRoomDto) => {
	type Key = keyof CreateRoomDto
	try {
		const { description, features, images, name, price } = payload
		let response: DataResponse
		Object.keys(payload).forEach((key) => {
			if (!payload[key as Key]) {
				response = {
					error: true,
					message: `Incomplete fields ${key}!`,
				}
				return response
			}
		})
		const isNotValidName = await Room.findOne({ name })
		if (isNotValidName) {
			response = {
				error: true,
				message: "This name is assigned to a room!",
			}
			return response
		}
		const image_urls: string[] = []
		for (let i = 0; i < images.length; i++) {
			const url = await uploader(images[i].path, "rooms")
			image_urls.push(url)
		}
		const room = await Room.create({
			name,
			description,
			features,
			price,
			images: image_urls,
		})
		if (!room) {
			response = {
				error: true,
				message: "Unable to add room!",
			}
			return response
		}
		response = {
			error: false,
			message: "Room added!",
			data: room,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create account!",
		}
		return response
	}
}

export const FindAllRoomsService = async () => {
	try {
		const rooms = await Room.find()
		const response: DataResponse = {
			error: false,
			message: "All rooms retrieved!",
			data: rooms,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create account!",
		}
		return response
	}
}

export const FindRoomService = async (id: string) => {
	try {
		let response: DataResponse
		const room = await Room.findById(id)
		if (!room) {
			response = {
				error: true,
				message: "Room does not exist!",
			}
			return response
		}
		response = {
			error: false,
			message: "Room found!",
			data: room,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create account!",
		}
		return response
	}
}

export const BookRoomService = async (payload: BookRoomDto) => {
	try {
		const { book, checkIn, checkOut, id } = payload
		let response: DataResponse
		if (book) {
			if (!checkIn || !checkOut) {
				response = {
					error: true,
					message: "Check in and check out dates are required!",
				}
				return response
			}
		}
		const room = await Room.findById(id)
		if (!room) {
			response = {
				error: true,
				message: "Room does not exist!",
			}
			return response
		}
		const bookedRoom = await Room.findByIdAndUpdate(
			id,
			{
				checkIn: checkIn,
				checkOut: checkOut,
				booked: book,
			},
			{
				new: true,
			}
		)
		if (!bookedRoom) {
			response = {
				error: true,
				message: "Unable to update booking!",
			}
			return response
		}
		response = {
			error: false,
			message: "Booking updated!",
			data: room,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create account!",
		}
		return response
	}
}

export const UpdateRoomService = async (payload: UpdateRoomDto) => {
	try {
		const { id, images } = payload
		let response: DataResponse
		const image_urls: string[] = []
		for (let i = 0; i < images.length; i++) {
			const url = await uploader(images[i].path, "rooms")
			image_urls.push(url)
		}
		const updatedRoom = await Room.findByIdAndUpdate(
			id,
			{
				...payload,
				images: image_urls,
			},
			{ new: true }
		)
		if (!updatedRoom) {
			response = {
				error: true,
				message: "Unable to update room!",
			}
			return response
		}
		response = {
			error: false,
			message: "Room updated!",
			data: updatedRoom,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create account!",
		}
		return response
	}
}

export const RemoveRoomService = async (id: string) => {
	try {
		await Room.findByIdAndDelete(id)
		const response: DataResponse = {
			error: false,
			message: "Room deleted!",
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create account!",
		}
		return response
	}
}
