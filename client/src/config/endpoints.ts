const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const endpoints = (param?: string | null, query?: string) => {
	const auth = {
		signup: `${baseUrl}/auth/signup`,
		signin: `${baseUrl}/auth/signin`,
	}

	const room = {
		create: `${baseUrl}/rooms/create`,
		find_all: `${baseUrl}/rooms?${query}`,
		find_one: `${baseUrl}/rooms/${param}`,
		book: `${baseUrl}/rooms/book/${param}`,
		update: `${baseUrl}/rooms/update/${param}`,
		remove: `${baseUrl}/rooms/remove/${param}`,
	}

	return {
		auth,
		room,
	}
}
