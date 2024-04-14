import { Router } from "express"

import { create, find, findAll, remove, update } from "./room-type.controller"
import { authorize, upload } from "../../common/middlewares"

const router = Router()

router.post("/create", authorize, upload.single("image"), create)
router.get("/", findAll)
router.get("/:id", find)
router.put("/update/:id", authorize, upload.single("image"), update)
router.delete("/remove/:id", authorize, remove)

export default router
