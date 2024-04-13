export type HttpError = {
	response: {
		data: {
			error: boolean
			message: string
		}
	}
}

export type QueryParams = {
	[key: string]: string
}
