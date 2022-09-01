import { State } from '../types'

export const initialState: State = {
	// auth: {
	// 	isAuth: false,
	// 	token: '',
	// },
	auth: {
		isAuth: true,
		token: 'flkjsadflaksjdflaksf'
	},
	user: {
		id: 'fdljaksdfjlaskdfjds',
		createdAt: new Date(),
		updatedAt: new Date(),
		email: 'customer@undefined.sh',
		role: 'customer'
	},
	customer: null,
	newOrder: {
		customerId: '',
		date: new Date(),
		containers: []
	},
	orders: {
		data: [],
		meta: {
			itemsPerPage: 0,
			page: 0,
			pages: 0,
			totalItems: 0,
		}
	},
	users: {
		data: [],
		meta: {
			itemsPerPage: 0,
			page: 0,
			pages: 0,
			totalItems: 0,
		}
	}
}
