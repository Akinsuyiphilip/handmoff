import { NextFunction, Response } from "express"

import { createError, createResponse } from "../../common/helpers"
import { HttpResponse, HttpStatus } from "../../common/constants"
import { ExpressRequest } from "../../common/interfaces"
import { UpdateUserDto } from "./user.dto"
import {
	FindAllUserService,
	FindUserService,
	RemoveUserService,
	UpdateUserService,
} from "./user.service"

export const findAll = async (_: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { error, message, data } = await FindAllUserService()
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

export const find = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params
		const { error, message, data } = await FindUserService(id)
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

export const update = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params
		const payload: UpdateUserDto = {
			...req.body,
			id,
		}
		const { error, message, data } = await UpdateUserService(payload)
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

export const remove = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params
		const { error, message, data } = await RemoveUserService(id)
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
