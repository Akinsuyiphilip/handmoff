import { HttpStatus, HttpResponse } from "../constants"

export function createError(status: number, data: any) {
	return {
		status: data[0].status,
		data: data[0].data,
		error: true,
		message: data[0].message,
		stack: new Error().stack,
		statusCode: status,
	}
}

createError.InternalServerError = (data: any) => {
	return createError(HttpStatus.SERVER_ERROR, [
		{
			status: HttpResponse.ERROR,
			message: data.message || "Internal Server Error.",
			data,
			stack: process.env.NODE === "development" ? new Error().stack : undefined,
		},
	])
}
