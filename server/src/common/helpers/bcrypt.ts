import bcrypt from "bcrypt"

export const generateHash = async (password: string) => {
	const saltRounds = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, saltRounds)
}

export const validatePassword = async (password: string, hash: string) => {
	return bcrypt.compare(password, hash)
}
