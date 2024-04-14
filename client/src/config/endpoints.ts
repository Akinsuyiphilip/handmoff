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
		find_by_type: `${baseUrl}/rooms/type/${param}`,
		book: `${baseUrl}/rooms/book/${param}`,
		update: `${baseUrl}/rooms/update/${param}`,
		remove: `${baseUrl}/rooms/remove/${param}`,
	}

	const room_type = {
		create: `${baseUrl}/room-types/create`,
		find_all: `${baseUrl}/room-types?${query}`,
		find_one: `${baseUrl}/room-types/${param}`,
		update: `${baseUrl}/room-types/update/${param}`,
		remove: `${baseUrl}/room-types/remove/${param}`,
	}

	const booking = {
		find_all: `${baseUrl}/bookings`,
		find_one: `${baseUrl}/bookings/${param}`,
		remove: `${baseUrl}/bookings/remove/${param}`,
	}

	return {
		auth,
		booking,
		room,
		room_type,
	}
}
