import { Schema, Types, model } from "mongoose"

import { RoomProps } from "../common/interfaces"

const room = new Schema<RoomProps>(
	{
		name: { type: String, unique: true, required: true },
		price: { type: Number, required: true },
		description: { type: String },
		features: [{ type: String }],
		images: [{ type: String }],
		room_type: { type: Types.ObjectId, ref: "RoomType", required: true, immutable: true },
		booked: { type: Boolean, default: false },
		checkIn: { type: Date },
		checkOut: { type: Date },
	},
	{
		timestamps: true,
	}
)

export const Room = model<RoomProps>("Room", room)
