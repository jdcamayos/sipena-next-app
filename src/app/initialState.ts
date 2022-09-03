import { State } from '../types'

export const initialState: State = {
	auth: {
		isAuth: false,
		token: '',
	},
	user: null,
	customer: null,
	orders: {
		data: [],
		meta: {
			itemsPerPage: 0,
			page: 0,
			pages: 0,
			totalItems: 0,
		},
	},
	newOrder: {
		containers: [],
		customerId: '',
		date: new Date(),
	},
	actualOrderId: '',
	order: {
		id: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		date: new Date(),
		status: false,
		customerId: '',
		attachments: [],
		comments: [],
		containers: [],
		workers: [],
	},
	users: {
		data: [],
		meta: {
			itemsPerPage: 0,
			page: 0,
			pages: 0,
			totalItems: 0,
		},
	},
	workers: {
		data: [],
		meta: {
			itemsPerPage: 0,
			page: 0,
			pages: 0,
			totalItems: 0,
		},
	},
}
