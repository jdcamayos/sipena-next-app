import { Auth } from '../types'

export const initialState: Auth = {
	auth: {
		isAuth: false,
		token: '',
	},
	user: null,
	customer: null,
}
