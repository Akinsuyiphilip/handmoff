import jwt from "jsonwebtoken"

import { Config } from "../constants"

export const sign = (id: any) => {
	return jwt.sign({ id }, Config.JWT_SECRET, { expiresIn: Config.EXPIRES_IN })
}

export const decode = (token: string) => {
	try {
		return jwt.decode(token)
	} catch (error) {
		return {}
	}
}

export const verify = (token: string) => {
	try {
		const id = jwt.verify(token, Config.JWT_SECRET)
		return id
	} catch (error) {
		return {}
	}
}
