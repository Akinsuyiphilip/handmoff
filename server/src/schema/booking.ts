import { Schema, Types, model } from "mongoose"

import { BookingProps } from "../common/interfaces"

const booking = new Schema<BookingProps>(
	{
		room: { type: Types.ObjectId, ref: "Room" },
		user: { type: Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
	}
)

export const Booking = model<BookingProps>("Booking", booking)
