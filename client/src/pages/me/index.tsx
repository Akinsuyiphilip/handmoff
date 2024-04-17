import { RiMailLine, RiAtLine, RiUserLine } from "@remixicon/react"
import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Appbar, Footer, Seo } from "@/components/shared"
import { useUserStore } from "@/store/z-store/user"

const initials = (value: string) => {
	return value
		.split(" ")
		.map((word) => word.substring(0, 1))
		.join("")
}

const Me = () => {
	const { user } = useUserStore()

	return (
		<>
			<Seo />
			<Appbar />
			<main className="flex w-full flex-col items-center justify-center">
				<div className="grid min-h-[50vh] w-full place-items-center bg-black/50 bg-hero bg-cover bg-center bg-no-repeat bg-blend-multiply">
					<div className="grid h-full w-full max-w-[1200px] place-items-center px-4 text-center text-white lg:px-0">
						<h1 className="text-3xl lg:text-7xl">Account</h1>
					</div>
				</div>
				<section className="w-full max-w-[1200px] px-4 py-10 text-hm-dark lg:px-0 lg:py-20">
					<div className="relative -top-40 w-full">
						<Avatar className="size-40">
							<AvatarImage src="" alt={user?.name} />
							<AvatarFallback className="font-heading text-5xl">
								{initials(String(user?.name))}
							</AvatarFallback>
						</Avatar>
					</div>
					<div className="flex w-full flex-col gap-6">
						<div className="flex w-full items-center gap-4">
							<RiUserLine size={32} />
							<p className="text-xl font-medium capitalize">{user?.name}</p>
						</div>
						<div className="flex w-full items-center gap-4">
							<RiMailLine size={32} />
							<p className="text-xl font-medium lowercase">{user?.email}</p>
						</div>
						<div className="flex w-full items-center gap-4">
							<RiAtLine size={32} />
							<p className="text-xl font-medium lowercase">{user?.username}</p>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Me
