import { DataResponse } from "../../common/interfaces"
import { UpdateUserDto } from "./user.dto"
import { User } from "../../schema"

export const FindAllUserService = async () => {
	try {
		const users = await User.find()
		const response: DataResponse = {
			error: false,
			message: "All users found!",
			data: users,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to find users!",
		}
		return response
	}
}

export const FindUserService = async (id: string) => {
	try {
		let response: DataResponse
		const user = await User.findById(id)
		if (!user) {
			response = {
				error: true,
				message: "User not found!",
			}
			return response
		}
		response = {
			error: false,
			message: "User found!",
			data: user,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to find user!",
		}
		return response
	}
}

export const UpdateUserService = async (payload: UpdateUserDto) => {
	try {
		const { id } = payload
		let response: DataResponse
		const user = await User.findById(id)
		if (!user) {
			response = {
				error: true,
				message: "User not found!",
			}
			return response
		}
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				...payload,
			},
			{ new: true }
		)
		if (!updatedUser) {
			response = {
				error: true,
				message: "Unable to update user!",
			}
			return response
		}
		response = {
			error: false,
			message: "User updated!",
			data: updatedUser,
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to update user!",
		}
		return response
	}
}

export const RemoveUserService = async (id: string) => {
	try {
		await User.findByIdAndDelete(id)
		const response: DataResponse = {
			error: false,
			message: "User deleted!",
		}
		return response
	} catch (error: any) {
		console.log(error)
		const response: DataResponse = {
			error: true,
			message: error.message || "Unable to remove user!",
		}
		return response
	}
}
