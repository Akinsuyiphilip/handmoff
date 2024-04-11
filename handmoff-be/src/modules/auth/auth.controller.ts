import { NextFunction, Response } from "express"

import { createError, createResponse } from "common/helpers"
import { SigninService, SignupService } from "./auth.service"
import { HttpResponse, HttpStatus } from "common/constants"
import { ExpressRequest } from "common/interfaces"
import { SigninDto, SignupDto } from "./auth.dto"

export const signup = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: SignupDto = req.body
		const { error, message, data } = await SignupService(payload)
		if (error) {
			return next(
				createError(HttpStatus.BAD_REQUEST, [
					{
						status: HttpResponse.ERROR,
						message,
						statusCode:
							data instanceof Error ? HttpStatus.SERVER_ERROR : HttpStatus.BAD_REQUEST,
						data,
					},
				])
			)
		}
		return createResponse(message, data)(res, HttpStatus.CREATED)
	} catch (error: any) {
		console.log(error)
		return next(createError.InternalServerError(error))
	}
}

export const signin = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: SigninDto = req.body
		const { error, message, data } = await SigninService(payload)
		if (error) {
			return next(
				createError(HttpStatus.BAD_REQUEST, [
					{
						status: HttpResponse.ERROR,
						message,
						statusCode:
							data instanceof Error ? HttpStatus.SERVER_ERROR : HttpStatus.BAD_REQUEST,
						data,
					},
				])
			)
		}
		return createResponse(message, data)(res, HttpStatus.OK)
	} catch (error: any) {
		console.log(error)
		return next(createError.InternalServerError(error))
	}
}
