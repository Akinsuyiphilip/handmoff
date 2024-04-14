import { CreateRoomTypeDto, UpdateRoomTypeDto } from "./room-type.dto"
import { DataResponse } from "../../common/interfaces"
import { uploader } from "../../common/helpers"
import { RoomType } from "../../schema"

export const CreateRoomTypeService = async (payload: CreateRoomTypeDto) => {
	try {
		type Key = keyof CreateRoomTypeDto
		const { description, image, name } = payload
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
		const isNotValidName = await RoomType.findOne({ name })
		if (isNotValidName) {
			response = {
				error: true,
				message: "This name is assigned to a room type!",
			}
			return response
		}
		const image_url = await uploader(image.path, "rooms")
		const room_type = await RoomType.create({
			name,
			description,
			image: image_url,
		})
		if (!room_type) {
			response = {
				error: true,
				message: "Unable to add room type!",
			}
			return response
		}
		response = {
			error: false,
			message: "Room type added!",
			data: room_type,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to create room type!",
		}
		return response
	}
}

export const FindAllRoomTypeService = async () => {
	try {
		const roomTypes = await RoomType.find()
		const response: DataResponse = {
			error: false,
			message: "All room types retrieved!",
			data: roomTypes,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to find room types!",
		}
		return response
	}
}

export const FindRoomTypeService = async (id: string) => {
	try {
		let response: DataResponse
		const roomType = await RoomType.findById(id)
		if (!roomType) {
			response = {
				error: true,
				message: "Room type does not exist!",
			}
			return response
		}
		response = {
			error: false,
			message: "Room found!",
			data: roomType,
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

export const UpdateRoomTypeService = async (payload: UpdateRoomTypeDto) => {
	try {
		const { id, image } = payload
		let response: DataResponse
		const image_url = await uploader(image.path, "rooms")
		const updatedRoomType = await RoomType.findByIdAndUpdate(
			id,
			{
				...payload,
				image: image_url,
			},
			{ new: true }
		)
		if (!updatedRoomType) {
			response = {
				error: true,
				message: "Unable to update room type!",
			}
			return response
		}
		response = {
			error: false,
			message: "Room type updated!",
			data: updatedRoomType,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to update room type!",
		}
		return response
	}
}

export const RemoveRoomTypeService = async (id: string) => {
	try {
		await RoomType.findByIdAndDelete(id)
		const response: DataResponse = {
			error: false,
			message: "Room deleted!",
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to delete room type!",
		}
		return response
	}
}
