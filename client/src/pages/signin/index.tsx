import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import Image from "next/image"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { useUserStore } from "@/store/z-store/user"
import { Seo, Spinner } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { endpoints } from "@/config"
import { HttpError } from "@/types"
import { instance } from "@/lib"

const initialValues = { email: "", password: "" }

const Signin = () => {
	const { signIn } = useUserStore()
	const router = useRouter()

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: typeof initialValues) =>
			instance.post(`${endpoints().auth.signin}`, payload),
		mutationKey: ["signin"],
		onSuccess: ({ data }) => {
			const {
				data: { token, user },
				message,
			} = data
			signIn(user, token)
			toast.success(message)
			router.push("/room-types")
		},
		onError: ({ response }: HttpError) => {
			const { message } = response.data
			toast.error(message)
		},
	})

	const { handleChange, handleSubmit } = useFormik({
		initialValues,
		onSubmit: (values) => mutateAsync(values),
	})

	return (
		<>
			<Seo title="Signin" />
			<main className="flex h-screen max-h-screen min-h-screen w-full items-center p-5">
				<div className="flex h-full w-full flex-1 flex-col justify-center gap-20">
					<div className="relative aspect-[2.8/1] w-[300px]">
						<Image
							src="/assets/logo-light.png"
							alt="handmoff"
							fill
							sizes="(max-width: 1024px) 100%"
						/>
					</div>
					<form
						onSubmit={handleSubmit}
						className="flex w-full max-w-[500px] flex-col gap-4">
						<div className="w-full">
							<Label htmlFor="email">Email</Label>
							<Input type="email" name="email" onChange={handleChange} />
						</div>
						<div className="w-full">
							<Label htmlFor="password">Password</Label>
							<Input type="password" name="password" onChange={handleChange} />
						</div>
						<Button type="submit" className="w-[200px]">
							{isPending ? <Spinner variant="white" /> : "Sign In"}
						</Button>
					</form>
					<div className="flex items-center">
						<p>
							Don&apos;t have an account yet?{" "}
							<Link href="/signup" className="link dark">
								Create an account
							</Link>
						</p>
					</div>
				</div>
				<div className="h-full w-full max-w-[500px]">
					<div className="relative h-full w-full rounded-2xl">
						<Image
							src="/assets/login.png"
							alt="login"
							fill
							sizes="(max-width: 1024px) 100%"
							className="rounded-2xl object-cover"
							priority
						/>
					</div>
				</div>
			</main>
		</>
	)
}

export default Signin
