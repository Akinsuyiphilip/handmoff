import { Schema, model } from "mongoose"
import validator from "validator"

import { UserProps } from "../common/interfaces"

const user = new Schema<UserProps>(
	{
		name: { type: String },
		username: { type: String, unique: true },
		email: {
			type: String,
			unique: true,
			validate: (value: string) => validator.isEmail(value),
		},
		password: {
			type: String,
			minLength: 6,
			validate: (value: string) => validator.isStrongPassword(value),
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(_doc, ret) {
				delete ret.password
			},
		},
	}
)

export const User = model<UserProps>("User", user)
