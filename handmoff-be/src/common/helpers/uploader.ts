import cloudinary from "common/constants/cloudinary"

type Folder = "users" | "rooms"

export const uploader = async (file: string, folder: Folder) => {
	const { secure_url } = await cloudinary.uploader.upload(file, {
		folder,
		transformation: [{ width: 300, height: 300, crop: "scale" }, { fetch_format: "webp" }],
		secure: true,
	})
	return secure_url
}
