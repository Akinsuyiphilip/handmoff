import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"

import { useUserStore } from "@/store/z-store/user"
import { Button } from "@/components/ui/button"
import { Account } from "./account"

interface Props {
	dark?: boolean
}

export const Appbar = ({}: Props) => {
	const { isAuthenticated, user } = useUserStore()
	const [scrolled, setScrolled] = useState(false)
	const { pathname } = useRouter()

	const handleScroll = () => setScrolled(window.scrollY > 200)

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	})

	return (
		<nav
			className={`left-0 top-0 !z-10 flex w-full items-center justify-center bg-black py-4 transition-all duration-500 lg:py-6 ${scrolled ? "fixed" : "static"}`}>
			<div className="flex w-full max-w-[1200px] items-center justify-between px-4 lg:px-0">
				<Link href="/">
					<div className="relative aspect-[2.8/1] w-[75px] lg:w-[150px]">
						<Image
							src="/assets/logo-dark.png"
							alt="handmoff"
							fill
							sizes="(max-width: 1024px) 100%"
						/>
					</div>
				</Link>
				<div className="flex items-center gap-4">
					{NAVIGATION.map(({ href, name }) => (
						<Link
							key={href}
							href={href}
							className={`link font-medium capitalize ${pathname === href ? "text-hm-light" : "text-hm-light/75"}`}>
							{name}
						</Link>
					))}
				</div>
				{isAuthenticated ? (
					<Account user={user} />
				) : (
					<Link href="/signin">
						<Button size="sm" variant="white">
							Sign In
						</Button>
					</Link>
				)}
			</div>
		</nav>
	)
}

const NAVIGATION = [
	{ name: "home", href: "/" },
	{ name: "room types", href: "/room-types" },
	{ name: "rooms", href: "/rooms" },
	{ name: "contact", href: "/contact" },
]
