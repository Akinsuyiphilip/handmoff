import { Router } from "express"

import room_type from "./room-type/room-type.route"
import booking from "./booking/booking.route"
import auth from "./auth/auth.route"
import room from "./room/room.route"
import user from "./user/user.route"

const routes = () => {
	const router = Router()

	router.use("/auth", auth)
	router.use("/rooms", room)
	router.use("/users", user)
	router.use("/room-types", room_type)
	router.use("/bookings", booking)

	return router
}

export default routes
