import dotenv from "dotenv"

dotenv.config()

export const Config: Record<string, string> = {
	CLOUDINARY_KEY: process.env.CLOUDINARY_KEY as string,
	CLOUDINARY_NAME: process.env.CLOUDINARY_NAME as string,
	CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET as string,
	EXPIRES_IN: process.env.EXPIRES_IN as string,
	JWT_SECRET: process.env.JWT_SECRET as string,
	MONGO_URI: process.env.MONGO_URI as string,
	NODE_ENV: process.env.NODE_ENV as string,
	PORT: process.env.PORT ? process.env.PORT.toString() : "",
	VERSION: process.env.VERSION as string,
}
