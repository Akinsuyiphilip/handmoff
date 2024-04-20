import { Schema, Types, model } from "mongoose"

import { BookingProps } from "../common/interfaces"

const booking = new Schema<BookingProps>(
	{
		guest_email: { type: String, required: true },
		guest_name: { type: String, required: true },
		guest_phone: { type: String, required: true },
		occupants: { type: Number, required: true, min: 1 },
		room: { type: Types.ObjectId, ref: "Room" },
	},
	{
		timestamps: true,
	}
)

export const Booking = model<BookingProps>("Booking", booking)
