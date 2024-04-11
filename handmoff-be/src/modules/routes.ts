import { Router } from "express"

import auth from "./auth/auth.route"

const routes = () => {
	const router = Router()

	router.use("/auth", auth)
	router.use("/rooms")

	return router
}

export default routes
