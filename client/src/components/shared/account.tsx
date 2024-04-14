import { useRouter } from "next/router"
import React, { useState } from "react"
import Link from "next/link"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserStore } from "@/store/z-store/user"
import { Button } from "@/components/ui/button"
import { UserProps } from "@/types"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
	user: UserProps | null
}

const initials = (value: string) => {
	return value
		.split(" ")
		.map((word) => word.substring(0, 1))
		.join("")
}

export const Account = ({ user }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	const { signOut } = useUserStore()
	const router = useRouter()

	const handleSignOut = () => {
		signOut()
		router.push("/signin")
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button className="flex items-center gap-3">
					<Avatar className="size-10 border">
						<AvatarImage src="" alt={user?.name} className="object-cover" />
						<AvatarFallback>{initials(String(user?.name))}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-start">
						<p className="text-sm capitalize text-hm-light">{user?.name}</p>
						<p className="text-xs font-medium lowercase text-gray-300">
							{user?.email}
						</p>
					</div>
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-[250px]">
				<div className="flex flex-col gap-1 capitalize">
					{LIST.map((item) => {
						if (item.href) {
							return (
								<Link
									key={item.name}
									href={item.href}
									className="rounded px-2 py-1 hover:bg-gray-200">
									{item.name}
								</Link>
							)
						} else {
							return (
								<Dialog key={item.name} open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
									<DialogTrigger asChild>
								<button
									className="rounded px-2 py-1 text-left capitalize text-red-500 hover:bg-red-200">
									{item.name}
								</button>
									</DialogTrigger>
									<DialogContent>
										<SignOut handleClose={() => setIsOpen(false)} handleSignOut={handleSignOut} />
									</DialogContent>
								</Dialog>
							)
						}
					})}
				</div>
			</PopoverContent>
		</Popover>
	)
}

const LIST = [{ name: "account", href: "/me" }, { name: "signout" }]

function SignOut({
	handleClose,
	handleSignOut
}:{
	handleClose: () => void
	handleSignOut: () => void
}) {
	return (
		<div className="w-full min-h-[350px] flex flex-col items-center justify-center gap-6 px-4 text-center">
			<p className="text-2xl lg:text-4xl font-semibold">
				Sign Out?
			</p>
			<p className="text-lg">Are you sure you want to sign out? Your current session will be terminated.</p>
			<div className="w-full grid grid-cols-2 gap-5">
				<Button variant="outline" onClick={handleClose}>Cancel</Button>
				<Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
			</div>
		</div>
	)
}
