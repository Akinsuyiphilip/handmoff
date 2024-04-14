import { Schema, model } from "mongoose"

import { RoomTypeProps } from "../common/interfaces"

const room_type = new Schema<RoomTypeProps>(
	{
		name: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

export const RoomType = model<RoomTypeProps>("RoomType", room_type)
