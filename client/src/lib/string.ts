import { QueryParams } from "./../types/http"

export const encodeQueryParams = (query: QueryParams) => {
	return Object.keys(query)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
		.join("&")
}
