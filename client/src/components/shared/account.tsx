import Link from "next/link"
import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
								<button
									key={item.name}
									className="rounded px-2 py-1 text-left capitalize text-red-500 hover:bg-red-200">
									{item.name}
								</button>
							)
						}
					})}
				</div>
			</PopoverContent>
		</Popover>
	)
}

const LIST = [{ name: "account", href: "/me" }, { name: "signout" }]
