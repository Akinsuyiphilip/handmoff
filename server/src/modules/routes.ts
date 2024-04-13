import { Router } from "express"

import auth from "./auth/auth.route"
import room from "./room/room.route"

const routes = () => {
	const router = Router()

	router.use("/auth", auth)
	router.use("/rooms", room)

	return router
}

export default routes
