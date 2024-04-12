import { Router } from "express"

import { book, create, find, findAll, remove, update } from "./room.controller"
import { authorize, upload } from "../../common/middlewares"

const router = Router()

router.post("/create", authorize, upload.array("images"), create)
router.get("/", authorize, findAll)
router.get("/:id", authorize, find)
router.put("/book/:id", authorize, book)
router.put("/update/:id", authorize, upload.array("images"), update)
router.delete("/remove/:id", authorize, remove)

export default router
