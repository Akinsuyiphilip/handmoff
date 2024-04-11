import { NextFunction, Response } from "express"

import { HttpResponse, HttpStatus } from "common/constants"
import { createError, verify } from "common/helpers"
import { ExpressRequest } from "common/interfaces"
import { User } from "schema"

export const authorize = async (req: ExpressRequest, _: Response, next: NextFunction) => {
	const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
	if (!token) {
		next(
			createError(HttpStatus.UNAUTHORIZED, [
				{
					status: HttpResponse.ERROR,
					message: "Authorization token is missing!",
					statusCode: HttpStatus.UNAUTHORIZED,
				},
			])
		)
	}
	try {
		const id = verify(token!)
		const user = await User.findById(id)
		if (!user) {
			return next(
				createError(HttpStatus.UNAUTHORIZED, [
					{
						status: HttpResponse.ERROR,
						message: "Unauthorized to perform this action!",
						statusCode: HttpStatus.UNAUTHORIZED,
					},
				])
			)
		}
		if (user) {
			req.user = user
			req.token = token
			next()
		} else {
			next(
				createError(HttpStatus.BAD_REQUEST, [
					{
						status: HttpResponse.ERROR,
						message: "Invalid auth token!",
						statusCode: HttpStatus.UNAUTHORIZED,
					},
				])
			)
		}
	} catch (error: any) {
		return next(
			createError(HttpStatus.BAD_REQUEST, [
				{
					status: HttpResponse.ERROR,
					message: error.message,
					statusCode: HttpStatus.UNAUTHORIZED,
				},
			])
		)
	}
}
