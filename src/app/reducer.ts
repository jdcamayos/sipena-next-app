import { actions, ActionType } from './actions'
import {
	AdminUser,
	Attachment,
	Auth,
	Comment,
	CreateContainerDto,
	CreateContainerItem,
	Customer,
	FindAllOrderResponse,
	FindAllUserResponse,
	FindOneOrderResponse,
	Order,
	State,
	User,
	Worker,
} from '../types'
import { initialState } from './initialState'

export const reducer = (state: State, action: ActionType): State => {
	switch (action.type) {
		case actions.loginRequest:
			return loginRequestReducer(state, action.payload)
		case actions.logoutRequest:
			return logoutRequestReducer(state, action.payload)
		case actions.setLoading:
			return setLoadingReducer(state, action.payload)
		case actions.getMeRequest:
			return getMeRequestReducer(state, action.payload)
		case actions.getCustomerRequest:
			return getCustomerRequestReducer(state, action.payload)
		case actions.getOrdersRequest:
			return getOrdersRequestReducer(state, action.payload)
		case actions.setOrdersPage:
			return setOrdersPageReducer(state, action.payload)
		case actions.createOrder:
			return createOrderReducer(state, action.payload)
		case actions.setOrderId:
			return setOrderIdReducer(state, action.payload)
		case actions.getOrderRequest:
			return getOrderRequestReducer(state, action.payload)
		case actions.setDate:
			return setDateReducer(state, action.payload)
		case actions.addContainer:
			return addContainerReducer(state, action.payload)
		case actions.editContainer:
			return editContainerReducer(state, action.payload)
		case actions.removeContainer:
			return removeContainerReducer(state, action.payload)
		case actions.createOrderRequest:
			return createOrderRequestReducer(state, action.payload)
		case actions.addAttachmentRequest:
			return addAttachmentRequestReducer(state, action.payload)
		case actions.addCommentRequest:
			return addCommentRequestReducer(state, action.payload)
		case actions.addWorkerRequest:
			return addWorkerRequestReducer(state, action.payload)
		case actions.setOrderStatusRequest:
			return setOrderStatusRequestReducer(state, action.payload)
		case actions.getUsersRequest:
			return getUsersRequestReducer(state, action.payload)
		case actions.setUsersPage:
			return setUsersPageReducer(state, action.payload)
		case actions.updateUserRequest:
			return updateUserRequestReducer(state, action.payload)
		case actions.getWorkersRequest:
			return getWorkersRequestReducer(state, action.payload)
		default:
			return state
	}
}

const loginRequestReducer = (state: State, payload: Auth['token']): State => ({
	...state,
	auth: {
		...state.auth,
		isAuth: true,
		token: payload,
	},
})

const logoutRequestReducer = (state: State, payload: unknown): State => ({
	...initialState,
})

const setLoadingReducer = (state: State, payload: Auth['loading']): State => ({
	...state,
	auth: {
		...state.auth,
		loading: payload,
	}
})

const getMeRequestReducer = (state: State, payload: User): State => ({
	...state,
	user: payload,
})

const getCustomerRequestReducer = (state: State, payload: Customer): State => ({
	...state,
	customer: payload,
})

const getOrdersRequestReducer = (state: State, payload: FindAllOrderResponse): State => ({
	...state,
	orders: payload,
})

const setOrdersPageReducer = (state: State, payload: number) => ({
	...state,
	ordersPage: payload,
})

const createOrderReducer = (state: State, payload: Customer['id']): State => ({
	...state,
	newOrder: {
		customerId: payload,
		date: new Date(),
		containers: [],
	},
})

const setOrderIdReducer = (state: State, payload: Order['id']): State => ({
	...state,
	actualOrderId: payload,
})

const getOrderRequestReducer = (state: State, payload: FindOneOrderResponse): State => ({
	...state,
	order: payload,
})

const setDateReducer = (state: State, payload: string | Date): State => ({
	...state,
	newOrder: {
		...state.newOrder,
		date: new Date(payload),
	},
})

const addContainerReducer = (state: State, payload: CreateContainerDto): State => ({
	...state,
	newOrder: {
		...state.newOrder,
		containers: [
			...state.newOrder.containers,
			{
				id:
					state.newOrder.containers.length === 0
						? state.newOrder.containers.length
						: state.newOrder.containers[state.newOrder.containers.length - 1].id + 1,
				...payload,
			},
		],
	},
})

const editContainerReducer = (state: State, payload: CreateContainerItem): State => ({
	...state,
	newOrder: {
		...state.newOrder,
		containers: [...state.newOrder.containers.filter(c => c.id !== payload.id), payload].sort((a, b) => a.id - b.id),
	},
})

const removeContainerReducer = (state: State, payload: CreateContainerItem['id']): State => ({
	...state,
	newOrder: {
		...state.newOrder,
		containers: [...state.newOrder.containers.filter(c => c.id !== payload)],
	},
})

const createOrderRequestReducer = (state: State, payload: unknown): State => ({
	...state,
	newOrder: {
		containers: [],
		customerId: '',
		date: new Date(),
	},
})

const addAttachmentRequestReducer = (state: State, payload: Attachment): State => ({
	...state,
	order: {
		...state.order,
		attachments: [...state.order.attachments, payload],
	},
})

const addCommentRequestReducer = (state: State, payload: Comment): State => ({
	...state,
	order: {
		...state.order,
		comments: [...state.order.comments, payload],
	},
})

const addWorkerRequestReducer = (state: State, payload: Worker): State => ({
	...state,
	order: {
		...state.order,
		workers: [...state.order.workers, payload].sort((a, b) => a.user.email.localeCompare(b.user.email)),
	},
})

const setOrderStatusRequestReducer = (state: State, payload: boolean): State => ({
	...state,
	order: {
		...state.order,
		status: payload,
	},
})


const getUsersRequestReducer = (state: State, payload: FindAllUserResponse): State => ({
	...state,
	users: payload,
})

const setUsersPageReducer = (state: State, payload: number) => ({
	...state,
	usersPage: payload,
})
const updateUserRequestReducer = (state: State, payload: AdminUser) => ({
	...state,
	users: {
		...state.users,
		data: [...state.users.data.filter(us => us.id !== payload.id), payload].sort((a, b) =>
			a.email.localeCompare(b.email)
		),
	},
})
// Workers
const getWorkersRequestReducer = (state: State, payload: FindAllUserResponse): State => ({
	...state,
	workers: payload,
})
