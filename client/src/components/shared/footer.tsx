import Image from "next/image"
import React from "react"
import {
	RiFacebookBoxFill,
	RiInstagramFill,
	RiTwitterFill,
} from "@remixicon/react"

export const Footer = () => {
	return (
		<footer className="flex w-full items-center justify-center bg-black text-hm-light">
			<div className="flex w-full max-w-[1200px] flex-col px-4 py-5 text-sm lg:px-0 lg:py-10">
				<div className="flex w-full flex-wrap items-start justify-between">
					<div className="w-full max-w-[400px]">
						<div className="relative aspect-[2.8/1] w-[200px] lg:w-[300px]">
							<Image
								src="/assets/logo-dark.png"
								alt="handmoff"
								fill
								sizes="(max-width: 1024px) 100%"
							/>
						</div>
					</div>
					<div className="flex w-full flex-1 flex-col items-start gap-5 lg:flex-row lg:gap-10"></div>
				</div>
				<hr className="my-5 w-full" />
				<div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
					<p>
						&copy; {new Date().getFullYear()}. Handmoff Hotel. All rights reserved.
					</p>
					<div className="flex items-center gap-5">
						{SOCIALS.map((link) => (
							<a
								key={link.name}
								href={link.url}
								className="transition-all hover:scale-125">
								<link.icon />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}

// const NAVIGATION = []

const SOCIALS = [
	{
		name: "facebook",
		icon: RiFacebookBoxFill,
		url: "https://facebook.com/",
	},
	{
		name: "instagram",
		icon: RiInstagramFill,
		url: "https://instagram.com/",
	},
	{
		name: "x",
		icon: RiTwitterFill,
		url: "https://x.com/",
	},
]
