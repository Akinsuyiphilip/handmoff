const requiredEnvs = [
	"NEXT_PUBLIC_API_URL",
	"NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY",
	"NEXT_PUBLIC_PAYSTACK_PUBLIC_SECRET",
] as const

type RequiredEnvs = (typeof requiredEnvs)[number]

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<RequiredEnvs, string> {
			readonly NEXT_PUBLIC_API_URL: string
			readonly NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: string
			readonly NEXT_PUBLIC_PAYSTACK_PUBLIC_SECRET: string
			readonly NODE_ENV: "development" | "production" | "test"
		}
	}
}

export {}
