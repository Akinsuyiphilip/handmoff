import { useRouter } from "next/router"
import BarCode from "react-barcode"
import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { PaystackResponse } from "@/types"
import { formatDate } from "@/lib"

const Reciept = () => {
	const router = useRouter()
	const data = router.query as PaystackResponse
	const redirectUrl = data.redirecturl

	const printReciept = () => {}

	return (
		<>
			<Seo title="Reciept" />
			<Appbar />
			<main className="w-full">
				<section className="flex w-full items-center justify-center py-10 lg:py-20">
					<div className="w-full max-w-[1200px] px-4 text-hm-dark lg:px-0">
						<div className="flex min-h-[500px] w-full flex-col items-center gap-10">
							<h3 className="text-2xl lg:text-4xl">Payment Made</h3>
							<div className="flex w-[350px] flex-col items-center gap-4 rounded-md border p-4 shadow-2xl">
								<p className="mb-5 text-lg lg:text-xl">Receipt</p>
								<div className="flex w-full items-center justify-between">
									<p className="text-gray-500">Payment Reference</p>
									<p className="font-medium">{data?.reference}</p>
								</div>
								<div className="flex w-full items-center justify-between">
									<p className="text-gray-500">Status</p>
									<p className="font-medium capitalize">{data?.status}</p>
								</div>
								<div className="flex w-full items-center justify-between">
									<p className="text-gray-500">Message</p>
									<p className="font-medium capitalize">{data?.message}</p>
								</div>
								<div className="flex w-full items-center justify-between">
									<p className="text-gray-500">Transaction ID</p>
									<p className="font-medium">{data?.trans}</p>
								</div>
								<div className="flex w-full items-center justify-between">
									<p className="text-gray-500">Transaction Date</p>
									<p className="font-medium">{formatDate(new Date().toString())}</p>
								</div>
								<BarCode
									value={`https://paystack.com${redirectUrl}`}
									width={0.4}
									height={75}
									displayValue={false}
								/>
							</div>
							<Button onClick={printReciept}>Print Receipt</Button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}

export default Reciept
