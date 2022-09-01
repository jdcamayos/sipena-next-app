import { CreateContainerDto, CreateOrderDto, UpdateContainerDto } from "../types"

export interface ActionType {
	type: string
	payload: any
}

export const actions = {
	// Auth
	// registerRequest: 'REGISTER_REQUEST',
	loginRequest: 'LOGIN_REQUEST',
	logoutRequest: 'LOGOUT_REQUEST',
	// User & Customer
	getMeRequest: 'GET_ME_REQUEST',
	getCustomerRequest: 'GET_CUSTOMER_REQUEST',
	// Orders
	getOrdersRequest: 'GET_ORDERS_REQUEST',
	// CreateOrder Form
	createOrder: 'CREATE_ORDER',
	setDate: 'SET_DATE',
	addContainer: 'ADD_CONTAINER',
	editContainer: 'EDIT_CONTAINER',
	removeContainer: 'REMOVE_CONTAINER',
	createOrderRequest: 'CREATE_ORDER_REQUEST',
	// Order
	addAttachmentRequest: 'ADD_ATTACHMENT_REQUEST',
	addCommentRequest: 'ADD_COMMENT_REQUEST',
	addWorkerRequest: 'ADD_WORKER_REQUEST',
}

// export const registerRequest = (payload: any) => ({
// 	type: actions.registerRequest,
// 	payload,
// })
export const loginRequest = (payload: any) => ({
	type: actions.loginRequest,
	payload,
})
export const logoutRequest = (payload: any) => ({
	type: actions.logoutRequest,
	payload,
})
export const getMeRequest = (payload: any) => ({
	type: actions.getMeRequest,
	payload,
})
export const getCustomerRequest = (payload: any) => ({
	type: actions.getCustomerRequest,
	payload,
})
export const getOrdersRequest = (payload: any) => ({
	type: actions.getOrdersRequest,
	payload,
})
export const createOrder = (payload: CreateOrderDto) => ({
	type: actions.createOrder,
	payload,
})
export const setDate = (payload: string | Date) => ({
	type: actions.setDate,
	payload
})
export const addContainer = (payload: CreateContainerDto) => ({
	type: actions.addContainer,
	payload,
})
export const editContainer = (payload: UpdateContainerDto) => ({
	type: actions.editContainer,
	payload
})
export const removeContainer = (payload: number) => ({
	type: actions.removeContainer,
	payload
})
export const createOrderRequest = (payload: any) => ({
	type: actions.createOrderRequest,
	payload,
})
export const addAttachmentRequest = (payload: any) => ({
	type: actions.addAttachmentRequest,
	payload,
})
export const addCommentRequest = (payload: any) => ({
	type: actions.addCommentRequest,
	payload,
})
export const addWorkerRequest = (payload: any) => ({
	type: actions.addWorkerRequest,
	payload,
})
