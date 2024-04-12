import multer from "multer"

const fileTypes: RegExp = /jpeg|jpg|png|svg|webp/i

export const upload = multer({
	storage: multer.diskStorage({}),
	fileFilter: (_req, file, cb) => {
		const ext = file.originalname.split(".").pop()
		const isValidExtenstion = fileTypes.test(ext!)
		if (!isValidExtenstion) {
			cb(new Error("Only images are allowed!"))
		}
		cb(null, true)
	},
})
