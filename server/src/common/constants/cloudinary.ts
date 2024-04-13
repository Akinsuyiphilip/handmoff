import { v2 as cloudinary } from "cloudinary"

import { Config } from "./keys"

cloudinary.config({
	api_key: Config.CLOUDINARY_KEY,
	api_secret: Config.CLOUDINARY_SECRET,
	cloud_name: Config.CLOUDINARY_NAME,
})

export default cloudinary
