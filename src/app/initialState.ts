import { State } from '../types'

export const initialState: State = {
	auth: {
		isAuth: false,
		token: '',
		loading: false,
	},
	user: null,
	customer: null,
	ordersPage: 1,
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
	usersPage: 1,
	users: {
		data: [],
		meta: {
			itemsPerPage: 0,
			page: 0,
			pages: 0,
			totalItems: 0,
		},
	},
	workersPage: 1,
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
