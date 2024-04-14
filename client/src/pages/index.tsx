import Link from "next/link"
import React from "react"

import { Appbar, Footer, Seo, Slider } from "@/components/shared"
import { Images, SellingPoints } from "@/config"
import { Button } from "@/components/ui/button"

const Home = () => {
	return (
		<>
			<Seo title="Enjoy the best in hospitality" />
			<Appbar />
			<main className="w-full">
				<div className="grid min-h-screen w-full place-items-center bg-black/50 bg-hero bg-cover bg-no-repeat bg-blend-multiply">
					<div className="flex w-full max-w-[1200px] flex-col items-center gap-6 px-4 text-center text-white lg:px-0">
						<h1 className="text-4xl lg:text-8xl">
							We provide the comfort of home, away from home
						</h1>
						<p className="text-xl text-gray-300 lg:text-3xl">
							Enjoy the finest of Handmoff&apos;s great services at affordable rates
						</p>
						<Link href="/room-types">
							<Button size="lg">Explore</Button>
						</Link>
					</div>
				</div>
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="w-full max-w-[1200px] gap-6 px-4 text-hm-dark lg:px-0">
						<div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
							<div className="w-full">
								<h3 className="text-3xl lg:text-5xl">
									Enjoy an unforgettable stay with the best charm
								</h3>
							</div>
							<div className="w-full">
								<p className="text-lg font-medium lg:text-xl">
									At Handmoff Hotel, we pride ourslves in offering premium services to
									our clients and putting their needs first
								</p>
								<Link href="" className="link dark text-xs lg:text-sm">
									More Info
								</Link>
							</div>
						</div>
						<div className="my-5 aspect-[3/2] w-full">
							<Slider images={Images} />
						</div>
					</div>
				</section>
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="flex w-full max-w-[1200px] flex-col items-center gap-6 px-4 lg:px-0">
						<h3 className="text-3xl lg:text-5xl">Why choose us?</h3>
						<div className="grid w-full grid-cols-2 gap-6">
							{SellingPoints.map((point) => (
								<div key={point.label} className="w-full p-2">
									<h4 className="text-xl lg:text-3xl">{point.label}</h4>
									<p className="text-lg font-medium lg:text-xl">{point.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className="flex min-h-[50dvh] w-full items-center justify-center bg-black/75 bg-launch bg-cover bg-fixed bg-no-repeat py-10 bg-blend-multiply lg:py-20">
					<div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-6 px-4 text-center lg:px-0">
						<h2 className="max-w-[700px] text-3xl text-hm-light lg:text-6xl">
							Check out what Handmoff has to offer
						</h2>
						<Link href="/room-types">
							<Button size="lg" variant="white">
								Explore
							</Button>
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Home
