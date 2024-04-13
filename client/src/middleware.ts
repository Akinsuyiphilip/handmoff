import { NextURL } from "next/dist/server/web/next-url"
import { NextRequest, NextResponse } from "next/server"

export const config = {
	matcher: ["/", "/signin", "/rooms/:path*"],
	name: "middleware",
}

export function middleware(req: NextRequest) {
	const hasToken = req.cookies.has("HANDMOFF_TOKEN")
	const url = req.nextUrl.clone() // Clone the URL to modify it
	const isOnRoomsRoute = url.pathname.startsWith("/rooms")

	const redirectResponse = (url: string | NextURL) => {
		const response = NextResponse.redirect(url)
		response.headers.set("x-middleware-cache", "no-cache") // ! FIX: Disable caching
		return response
	}

	// Redirects for users with a token trying to access auth
	if (hasToken && !isOnRoomsRoute) {
		url.pathname = "/rooms"
		return redirectResponse(url)
	}

	// Redirect users without a token trying to access any rooms/* path
	if (!hasToken && isOnRoomsRoute) {
		url.pathname = "/signin"
		return redirectResponse(url)
	}

	return NextResponse.next()
}
