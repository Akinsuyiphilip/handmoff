/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response, Router } from "express"
import swaggerUi from "swagger-ui-express"
import morgan from "morgan"
import cors from "cors"

import { Config, HttpResponse, HttpStatus } from "./common/constants"
import { createError } from "./common/helpers"
import routes from "./modules/routes"
import { specs } from "./common/docs"

export const createApp = () => {
	const app = express()

	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())
	app.use(
		cors({
			origin: "*",
		})
	)
	app.use(morgan("dev"))

	app.use(function (_err: any, _req: any, _res: any, _: any) {
		if (_err instanceof SyntaxError) {
			return _res.status(HttpStatus.BAD_REQUEST).json({
				code: HttpStatus.UNPROCESSABLE_ENTITY,
				status: HttpResponse.ERROR,
				message: "Invalid JSON payload passed.",
				data: null,
			})
		}
	})

	const router = Router()
	router.use(routes())

	router.use((_req, _res, next) => {
		next(
			createError(HttpStatus.NOT_FOUND, [
				{
					code: HttpStatus.NOT_FOUND,
					status: HttpResponse.ERROR,
					message: "Route not found.",
					data: null,
				},
			])
		)
	})

	router.use((error: any, _req: any, res: Response, _next: NextFunction) => {
		console.log(error)
		const initialError = error
		if (!error.statusCode) {
			error = createError(HttpStatus.SERVER_ERROR, [
				{
					code: HttpStatus.SERVER_ERROR,
					status: HttpResponse.ERROR,
					message: initialError.message || "Internal Server Error.",
					data: error.data,
					stack: error.stack,
				},
			])
		}

		return res.status(error.statusCode).json({
			code: error.code,
			status: error.status,
			message: error.message,
			data: error.data || null,
			...(process.env.NODE_ENV === "development" && { stack: error.stack }),
		})
	})

	const API_URL = `/api/${Config.VERSION}`

	app.get("/", async (_req: Request, res: Response) => {
		return res.send({ message: `Hello from Handmoff API ${Config.VERSION}` })
	})

	app.use(`${API_URL}/docs`, swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

	app.use(API_URL, router)
	return app
}
