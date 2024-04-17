import { Router } from "express"

import { find, findAll, remove, update } from "./user.controller"
import { authorize } from "../../common/middlewares"

const router = Router()

router.get("/", authorize, findAll)
router.get("/:id", authorize, find)
router.put("/update/:id", authorize, update)
router.delete("/remove:id", authorize, remove)

export default router
