import { FilterQuery } from "mongoose"

import { BookRoomDto, CreateRoomDto, UpdateRoomDto } from "./room.dto"
import { DataResponse, RoomProps } from "../../common/interfaces"
import { Booking, Room, RoomType } from "../../schema"
import { uploader } from "../../common/helpers"

export const CreateRoomService = async (payload: CreateRoomDto) => {
	type Key = keyof CreateRoomDto
	try {
		const { description, features, images, name, price, room_type } = payload
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
		const roomType = await RoomType.findById(room_type)
		if (!roomType) {
			response = {
				error: true,
				message: `This room type is invalid!`,
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
			room_type: roomType,
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
			message: error.message || "Unable to create room!",
		}
		return response
	}
}

export const FindAllRoomsService = async () => {
	try {
		const rooms = await Room.find().populate("room_type")
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
			message: error.message || "Unable to find rooms!",
		}
		return response
	}
}

export const FindRoomService = async (id: string) => {
	try {
		let response: DataResponse
		const room = await Room.findById(id).populate("room_type")
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
			message: error.message || "Unable to find room!",
		}
		return response
	}
}

export const FindRoomByTypeService = async (roomTypeId: string) => {
	try {
		const filter: FilterQuery<RoomProps> = { room_type: roomTypeId }
		const rooms = await Room.find(filter).populate("room_type")
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
			message: error.message || "Unable to find rooms!",
		}
		return response
	}
}

export const BookRoomService = async (payload: BookRoomDto) => {
	try {
		const { book, checkIn, checkOut, email, id, name, occupants, phone } = payload
		let response: DataResponse
		if (book) {
			for (const key in payload) {
				if (!payload[key as keyof BookRoomDto]) {
					response = {
						error: true,
						message: `${key} is required!`,
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
			const updatedRoom = await Room.findByIdAndUpdate(
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
			if (!updatedRoom) {
				response = {
					error: true,
					message: "Unable to update booking!",
				}
				return response
			}
			const booking = await Booking.create({
				guest_email: email,
				guest_name: name,
				guest_phone: phone,
				occupants,
				room: updatedRoom,
			})
			if (!booking) {
				response = {
					error: true,
					message: "Booking failed!",
				}
				return response
			}
			await booking.populate("room")
			response = {
				error: false,
				message: "Booking updated!",
				data: booking,
			}
			return response
		}
		const room = await Room.findById(id)
		if (!room) {
			response = {
				error: true,
				message: "Room does not exist!",
			}
			return response
		}
		const updatedRoom = await Room.findByIdAndUpdate(
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
		if (!updatedRoom) {
			response = {
				error: true,
				message: "Unable to update booking!",
			}
			return response
		}
		response = {
			error: false,
			message: "Booking updated!",
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to book room!",
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
			message: error.message || "Unable to update room!",
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
			message: error.message || "Unable to delete room!",
		}
		return response
	}
}
