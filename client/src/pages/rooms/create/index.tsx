import { useMutation, useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { toast } from "sonner"

import { Appbar, Footer, Seo, Spinner } from "@/components/shared"
import { Textarea } from "@/components/ui/textarea"
import { HttpError, RoomTypeProps } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { endpoints } from "@/config"
import { instance } from "@/lib"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const initialValues: CreateRoomDto = {
	name: "",
	price: 0,
	description: "",
	features: "",
	images: [],
	room_type: "",
}

const CreateRoom = () => {
	const router= useRouter()

	const { data } = useQuery({
		queryFn: () => instance.get(`${endpoints().room_type.find_all}`),
		queryKey: ["get-room-types"],
	})

	const [roomTypes, setRoomTypess] = useState<RoomTypeProps[]>([])
	useEffect(() => {
		if (data) {
			setRoomTypess(data?.data.data)
		}
	}, [data])

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: FormData) =>
			instance.post(`${endpoints().room.create}`, payload),
		mutationKey: ["create-room"],
		onSuccess: ({ data }) => {
			const { message } = data
			toast.success(message)
			router.push("/room-types")
		},
		onError: ({ response }: HttpError) => {
			const { message } = response.data
			toast.error(message)
		},
	})

	const { handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues,
		onSubmit: (values) => {
			Object.keys(values).forEach((key) => {
				if (!values[key as FormKey]) {
					toast.error(`Can not leave the ${key} empty!`)
					return
				}
			})
			const features = values.features.split(",")
			const formData = new FormData()
			formData.append("name", values.name)
			formData.append("price", values.price.toString())
			formData.append("description", values.description)
			formData.append("room_type", values.room_type)
			for (let i = 0; i <= features.length; i++) {
				formData.append("features", features[i])
			}
			for (let i = 0; i <= values.images.length;i++) {
				formData.append("images", values.images[i])
			}
			mutateAsync(formData)
		},
	})

	const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const files = e.target.files
		setFieldValue("images", files)
	}

	return (
		<>
			<Seo title="Add Room" />
			<Appbar />
			<main className="flex w-full items-center justify-center py-10 lg:py-20">
				<div className="w-full max-w-[1200px] gap-6 px-4 text-hm-dark lg:px-0">
					<div className="grid w-full grid-cols-2 gap-6">
						<div className="flex w-full flex-col gap-10">
							<h3 className="text-3xl lg:text-6xl">Add Room</h3>
							<form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
								<div className="w-full">
									<Label htmlFor="name">Name</Label>
									<Input type="text" name="name" onChange={handleChange} />
								</div>
								<div className="w-full">
									<Label htmlFor="price">Price</Label>
									<Input
										type="number"
										name="price"
										onChange={handleChange}
										min={10000}
									/>
								</div>
								<div className="w-full">
									<Label htmlFor="description">Description</Label>
									<Textarea name="description" onChange={handleChange} className="resize-none min-h-[150px]" />
								</div>
								<div className="w-full">
									<Label htmlFor="features">Features</Label>
									<Input type="text" name="features" onChange={handleChange} />
								</div>
								<div className="w-full">
									<Label htmlFor="images">Images</Label>
									<Input
										type="file"
										name="images"
										onChange={addImage}
										multiple
										accept="img/*"
									/>
								</div>
								<div>
									<Label>Room Type</Label>
									<Select onValueChange={(value) => setFieldValue("room_type", value)}>
										<SelectTrigger>
											<SelectValue placeholder="Select Room Type" />
										</SelectTrigger>
										<SelectContent>
											{roomTypes.map((roomType) => (
												<SelectItem key={roomType._id} value={roomType._id}>
													{roomType.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<Button type="submit" className="w-[200px]">
									{isPending ? <Spinner variant="white" /> : "Add Room"}
								</Button>
							</form>
						</div>
						<div className="grid w-full grid-cols-2 gap-4"></div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default CreateRoom

type CreateRoomDto = {
	name: string
	price: number
	description: string
	features: string
	images: File[]
	room_type: string
}

type FormKey = keyof CreateRoomDto
