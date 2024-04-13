import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		fontFamily: {
			base: ["Space Grotesk", "sans-serif"],
			heading: ["Yeseva One", "sans"],
		},
		extend: {
			backgroundImage: {
				hero: "url('/assets/hero.jpg')",
				launch: "url('/assets/launch.jpg')",
			},
			colors: {
				"hm-primary": "#23385e",
				"hm-secondary": "#a6abbd",
				"hm-accent": "#fff6e7",
				"hm-dark": "#0d0501",
				"hm-light": "#fff6e7",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
