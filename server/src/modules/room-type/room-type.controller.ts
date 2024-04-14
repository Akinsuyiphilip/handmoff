import { NextFunction, Response } from "express"

import { CreateRoomTypeDto, UpdateRoomTypeDto } from "./room-type.dto"
import { createError, createResponse } from "../../common/helpers"
import { HttpResponse, HttpStatus } from "../../common/constants"
import { ExpressRequest } from "../../common/interfaces"
import {
	CreateRoomTypeService,
	FindAllRoomTypeService,
	FindRoomTypeService,
	RemoveRoomTypeService,
	UpdateRoomTypeService,
} from "./room-type.service"

export const create = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: CreateRoomTypeDto = {
			...req.body,
			image: req.file,
		}
		const { error, message, data } = await CreateRoomTypeService(payload)
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

export const findAll = async (_: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { error, message, data } = await FindAllRoomTypeService()
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
		const { error, message, data } = await FindRoomTypeService(id)
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
		const payload: UpdateRoomTypeDto = {
			...req.body,
			id,
			image: req.file,
		}
		const { error, message, data } = await UpdateRoomTypeService(payload)
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
		const { error, message, data } = await RemoveRoomTypeService(id)
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
