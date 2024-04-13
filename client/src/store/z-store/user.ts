import Cookies from "js-cookie"

import { createPersistMiddleware } from "../middleware/persist"
import { UserProps } from "@/types"

interface UserStore {
	user: UserProps | null
	isAuthenticated: boolean
	signIn: (user: UserProps, token: string) => void
	signOut: () => void
}

const initialStore: UserStore = {
	user: null,
	isAuthenticated: false,
	signIn: () => {},
	signOut: () => {},
}

const useUserStore = createPersistMiddleware<UserStore>("user", (set) => ({
	...initialStore,
	signIn: (user, token) => {
		Cookies.set("HANDMOFF_TOKEN", token)
		set({ user, isAuthenticated: true })
	},
	signOut: () => {
		Cookies.remove("HANDMOFF_TOKEN")
		set({ user: null, isAuthenticated: false })
	},
}))

export { useUserStore }
