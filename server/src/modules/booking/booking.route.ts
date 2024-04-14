import { Router } from "express"

import { find, findAll, remove } from "./booking.controller"
import { authorize } from "../../common/middlewares"

const router = Router()

router.get("/", authorize, findAll)
router.get("/:id", authorize, find)
router.delete("/remove/:id", authorize, remove)

export default router
