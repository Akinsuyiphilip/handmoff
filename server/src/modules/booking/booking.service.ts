import { DataResponse } from "../../common/interfaces"
import { Booking } from "../../schema"

export const FindAllBookingService = async () => {
	try {
		const bookings = await Booking.find().populate("user", "room")
		const response: DataResponse = {
			error: false,
			message: "All booking retrieved!",
			data: bookings,
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

export const FindBookingService = async (id: string) => {
	try {
		let response: DataResponse
		const booking = await Booking.findById(id).populate("user", "room")
		if (!booking) {
			response = {
				error: true,
				message: "Booking does not exist!",
			}
			return response
		}
		response = {
			error: false,
			message: "Booking found!",
			data: booking,
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

export const RemoveBookingService = async (id: string) => {
	try {
		await Booking.findByIdAndDelete(id)
		const response: DataResponse = {
			error: false,
			message: "Room deleted!",
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
