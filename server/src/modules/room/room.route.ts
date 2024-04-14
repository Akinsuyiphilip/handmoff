import { Router } from "express"

import { authorize, upload } from "../../common/middlewares"
import {
	book,
	create,
	find,
	findAll,
	findByType,
	remove,
	update,
} from "./room.controller"

const router = Router()

router.post("/create", authorize, upload.array("images"), create)
router.get("/", findAll)
router.get("/:id", find)
router.get("/type/:id", findByType)
router.put("/book/:id", authorize, book)
router.put("/update/:id", authorize, upload.array("images"), update)
router.delete("/remove/:id", authorize, remove)

export default router
