import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Appbar, Footer, Seo } from "@/components/shared"
import { endpoints } from "@/config"
import { UserProps } from "@/types"
import { instance } from "@/lib"

const Users = () => {
	const { data } = useQuery({
		queryFn: () => instance.get(`${endpoints().user.find_all}`),
		queryKey: ["get-users"],
	})

	const [] = useState<UserProps[]>([])
	useEffect(() => {
		if (data) {
			console.log(data?.data)
		}
	}, [data])

	return (
		<>
			<Seo title="Users" />
			<Appbar />
			<main className="w-full">
				<div className="grid min-h-[50vh] w-full place-items-center bg-black/50 bg-hero bg-cover bg-center bg-no-repeat bg-blend-multiply">
					<div className="grid h-full w-full max-w-[1200px] place-items-center px-4 text-center text-white lg:px-0">
						<h1 className="text-3xl lg:text-7xl">See all users</h1>
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

export default Users
