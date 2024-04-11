import multer from "multer"

const fileTypes: RegExp = /jpeg|jpg|png|svg|webp/i

export const upload = multer({
	storage: multer.diskStorage({}),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: (_req, file, cb) => {
		const ext = file.originalname.split(".").pop()
		const isValidExtenstion = fileTypes.test(ext!)
		if (!isValidExtenstion) {
			cb(new Error("Only images are allowed!"))
		}
		cb(null, true)
	},
})
