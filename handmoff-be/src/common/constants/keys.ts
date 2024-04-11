import dotenv from "dotenv"

dotenv.config()

export const Config = {
	CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
	CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
	CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
	EXPIRES_IN: process.env.EXPIRES_IN,
	JWT_SECRET: process.env.JWT_SECRET,
	MONGO_URI: process.env.MONGO_URI,
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	VERSION: process.env.VERSION,
}
