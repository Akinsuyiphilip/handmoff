import type { AppProps } from "next/app"

import { QueryProvider } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryProvider>
			<Component {...pageProps} />
			<Toaster />
		</QueryProvider>
	)
}
