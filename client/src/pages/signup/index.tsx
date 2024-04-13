import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import Image from "next/image"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { Seo, Spinner } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { endpoints } from "@/config"
import { HttpError } from "@/types"
import { instance } from "@/lib"

const initialValues = { email: "", name: "", password: "", username: "" }

const Signup = () => {
	const router = useRouter()

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: typeof initialValues) =>
			instance.post(`${endpoints().auth.signup}`, payload),
		mutationKey: ["signup"],
		onSuccess: ({}) => {
			router.push("/signin")
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
			<Seo title="Create Account" />
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
							<Label htmlFor="name">Name</Label>
							<Input type="text" name="name" onChange={handleChange} />
						</div>
						<div className="w-full">
							<Label htmlFor="username">Username</Label>
							<Input type="text" name="username" onChange={handleChange} />
						</div>
						<div className="w-full">
							<Label htmlFor="email">Email</Label>
							<Input type="email" name="email" onChange={handleChange} />
						</div>
						<div className="w-full">
							<Label htmlFor="password">Password</Label>
							<Input type="password" name="password" onChange={handleChange} />
						</div>
						<Button type="submit" className="w-[200px]">
							{isPending ? <Spinner variant="white" /> : "Create Account"}
						</Button>
					</form>
					<div className="flex items-center">
						<p>
							Have have an account already?{" "}
							<Link href="/signin" className="link dark">
								Sign in to your account
							</Link>
						</p>
					</div>
				</div>
				<div className="h-full w-full max-w-[500px]">
					<div className="relative h-full w-full rounded-2xl">
						<Image
							src="/assets/register.png"
							alt="register"
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

export default Signup
