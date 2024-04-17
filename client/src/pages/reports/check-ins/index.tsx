// import { useQuery } from "@tanstack/react-query"
import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"
// import { endpoints } from "@/config"
// import { RoomProps } from "@/types"
// import { instance } from "@/lib"

const CheckIns = () => {
	return (
		<>
			<Seo title="Check-ins" />
			<Appbar />
			<main className="w-full">
				<div className="grid min-h-[50vh] w-full place-items-center bg-black/50 bg-hero bg-cover bg-center bg-no-repeat bg-blend-multiply">
					<div className="grid h-full w-full max-w-[1200px] place-items-center px-4 text-center text-white lg:px-0">
						<h1 className="text-3xl lg:text-7xl">See all check-ins</h1>
					</div>
				</div>
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="flex w-full max-w-[1200px] flex-col items-center gap-6 px-4 text-center text-white lg:px-0"></div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default CheckIns
