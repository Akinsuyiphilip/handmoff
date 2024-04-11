const requiredEnvs = [
	"CLOUDINARY_NAME",
	"CLOUDINARY_KEY",
	"CLOUDINARY_SECRET",
	"EXPIRES_IN",
	"JWT_SECRET",
	"MONGO_URI",
	"NODE_ENV",
	"PORT",
	"VERSION",
] as const

type RequiredEnvs = (typeof requiredEnvs)[number]

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<RequiredEnvs, string> {
			readonly CLOUDINARY_NAME: string
			readonly CLOUDINARY_KEY: string
			readonly CLOUDINARY_SECRET: string
			readonly EXPIRES_IN: string
			readonly JWT_SECRET: string
			readonly MONGO_URI: string
			readonly NODE_ENV: "development" | "production"
			readonly PORT: string
			readonly VERSION: string
		}
	}
}

export {}
