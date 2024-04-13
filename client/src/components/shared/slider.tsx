import React, { useEffect, useState } from "react"
import { StaticImageData } from "next/image"
import { motion } from "framer-motion"
import Image from "next/image"

type ImageProps = {
	name: string
	url: StaticImageData | string
}

interface Props {
	images: ImageProps[]
}

export const Slider = ({ images }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const length = images.length

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((currentIndex + 1) % length)
		}, 10000)
		return () => clearInterval(interval)
	})

	return (
		<div className="relative flex h-full w-full items-center justify-center overflow-hidden">
			{images.map((image, index) => (
				<motion.div
					key={image.name}
					initial={{ opacity: 0.4 }}
					whileInView={{ opacity: 1 }}
					transition={{
						type: "tween",
						delay: 0.1,
						duration: 1,
						easings: ["easeIn", "easeOut"],
					}}
					className={`relative h-full w-full ${index === currentIndex ? "block" : "hidden"}`}>
					<Image
						src={image.url}
						alt={image.name}
						fill
						priority
						sizes="(max-width: 1024px) 100%,"
						className="object-cover"
					/>
				</motion.div>
			))}
		</div>
	)
}
