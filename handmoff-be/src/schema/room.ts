import { Schema, model } from "mongoose"

import { RoomProps } from "common/interfaces"

const room = new Schema<RoomProps>(
	{
		name: { type: String, unique: true },
		price: { type: Number },
		description: { type: String },
		features: [{ type: String }],
		images: [{ type: String }],
		checkIn: { type: Date },
		checkOut: { type: Date },
	},
	{
		timestamps: true,
	}
)

export const Room = model<RoomProps>("Room", room)
