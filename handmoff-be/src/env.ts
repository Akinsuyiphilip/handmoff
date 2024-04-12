import { z } from "zod"

const schema = z.object({
	CLOUDINARY_NAME: z.string(),
	CLOUDINARY_KEY: z.string(),
	CLOUDINARY_SECRET: z.string(),
	EXPIRES_IN: z.string(),
	JWT_SECRET: z.string(),
	MONGO_URI: z.string(),
	NODE_ENV: z
		.union([z.literal("development"), z.literal("testing"), z.literal("production")])
		.default("development"),
	PORT: z.number().min(1000),
	VERSION: z.string(),
})

export const env = schema.parse(process.env)
export type Environment = z.infer<typeof schema>

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof schema> {}
	}
}

export {}
