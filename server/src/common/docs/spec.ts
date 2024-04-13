import swaggerJsDoc from "swagger-jsdoc"

const options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Handmoff API",
			version: "1.0.0",
			description: "API documentation for Handmoff backend",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "Handmoff Support",
				url: "https://handmoff.vercel.app",
				email: "",
			},
		},
		basePath: "/",
		schemes: ["http"],
		consumes: ["application/json"],
		produces: ["application/json"],
	},
	apis: ["../../modules/**/*.route.ts"],
} satisfies swaggerJsDoc.Options

export const specs = swaggerJsDoc(options)
