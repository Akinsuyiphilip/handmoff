import { NextFunction, Response } from "express"

import { BookRoomDto, CreateRoomDto, UpdateRoomDto } from "./room.dto"
import { createError, createResponse } from "../../common/helpers"
import { HttpResponse, HttpStatus } from "../../common/constants"
import { ExpressRequest } from "../../common/interfaces"
import {
	BookRoomService,
	CreateRoomService,
	FindAllRoomsService,
	FindRoomService,
	RemoveRoomService,
	UpdateRoomService,
} from "./room.service"

export const create = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const payload: CreateRoomDto = {
			...req.body,
			images: req.files,
		}
		const { error, message, data } = await CreateRoomService(payload)
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
		const { error, message, data } = await FindAllRoomsService()
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
		const { error, message, data } = await FindRoomService(id)
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

export const book = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params
		const payload: BookRoomDto = { ...req.body, id }
		const { error, message, data } = await BookRoomService(payload)
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
		const payload: UpdateRoomDto = {
			...req.body,
			id,
			images: req.files,
		}
		const { error, message, data } = await UpdateRoomService(payload)
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
		const { error, message, data } = await RemoveRoomService(id)
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
