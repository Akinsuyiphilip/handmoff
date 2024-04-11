import mongoose from "mongoose"

const roomSchema = new mongoose.Schema(
	{
		roomName: { type: String, unique: true, required: [true, "Room name is required"], },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		features: { type: [String] },
		image: { type: String, required: true },
		isAvailable: { type: Boolean, default: true },
		checkIn: { type: Date },
		checkOut: { type: Date },
	},
	{
		timestamps: true,
	}
)

const roomModel = mongoose.model("rooms", roomSchema)
export default roomModel
