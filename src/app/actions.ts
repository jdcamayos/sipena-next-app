import {
	AdminUser,
	Attachment,
	Auth,
	Comment,
	CreateContainerDto,
	CreateContainerItem,
	CreateOrderDto,
	Customer,
	FindAllOrderResponse,
	FindAllUserResponse,
	FindOneOrderResponse,
	Order,
	UpdateContainerDto,
	User,
} from '../types'

export interface ActionType {
	type: string
	payload: any
}

export const actions = {
	// Auth
	loginRequest: 'LOGIN_REQUEST',
	logoutRequest: 'LOGOUT_REQUEST',
	// User & Customer
	getMeRequest: 'GET_ME_REQUEST',
	getCustomerRequest: 'GET_CUSTOMER_REQUEST',
	// Orders
	getOrdersRequest: 'GET_ORDERS_REQUEST',
	setOrdersPage: 'SET_ORDERS_PAGE',
	// CreateOrder Form
	createOrder: 'CREATE_ORDER',
	setDate: 'SET_DATE',
	addContainer: 'ADD_CONTAINER',
	editContainer: 'EDIT_CONTAINER',
	removeContainer: 'REMOVE_CONTAINER',
	createOrderRequest: 'CREATE_ORDER_REQUEST',
	// Order
	setOrderId: 'SET_ORDER_ID',
	getOrderRequest: 'GET_ORDER_REQUEST',
	addAttachmentRequest: 'ADD_ATTACHMENT_REQUEST',
	addCommentRequest: 'ADD_COMMENT_REQUEST',
	addWorkerRequest: 'ADD_WORKER_REQUEST',
	setOrderStatusRequest: 'SET_ORDER_STATUS_REQUEST',
	// Admin
	getUsersRequest: 'GET_USER_REQUEST',
	setUsersPage: 'SET_USERS_PAGE',
	updateUserRequest: 'UPDATE_USER_REQUEST',
	// Workers
	getWorkersRequest: 'GET_WORKERS_REQUEST'
}

// Auth
export const loginRequest = (payload: Auth['token']) => ({
	type: actions.loginRequest,
	payload,
})
export const logoutRequest = (payload: unknown) => ({
	type: actions.logoutRequest,
	payload,
})
// User & Customer
export const getMeRequest = (payload: User) => ({
	type: actions.getMeRequest,
	payload,
})
export const getCustomerRequest = (payload: Customer) => ({
	type: actions.getCustomerRequest,
	payload,
})
// Orders
export const getOrdersRequest = (payload: FindAllOrderResponse) => ({
	type: actions.getOrdersRequest,
	payload,
})
export const setOrdersPage = (payload: number) => ({
	type: actions.setOrdersPage,
	payload,
})
// CreateOrder Form
export const createOrder = (payload: Customer['id']) => ({
	type: actions.createOrder,
	payload,
})
export const setDate = (payload: string | Date) => ({
	type: actions.setDate,
	payload,
})
export const addContainer = (payload: CreateContainerDto) => ({
	type: actions.addContainer,
	payload,
})
export const editContainer = (payload: UpdateContainerDto) => ({
	type: actions.editContainer,
	payload,
})
export const removeContainer = (payload: CreateContainerItem['id']) => ({
	type: actions.removeContainer,
	payload,
})
export const createOrderRequest = (payload: unknown) => ({
	type: actions.createOrderRequest,
	payload,
})
// Order
export const setOrderId = (payload: Order['id']) => ({
	type: actions.setOrderId,
	payload,
})
export const getOrderRequest = (payload: FindOneOrderResponse) => ({
	type: actions.getOrderRequest,
	payload,
})
export const addAttachmentRequest = (payload: Attachment) => ({
	type: actions.addAttachmentRequest,
	payload,
})
export const addCommentRequest = (payload: Comment) => ({
	type: actions.addCommentRequest,
	payload,
})
export const addWorkerRequest = (payload: unknown) => ({
	type: actions.addWorkerRequest,
	payload,
})
export const setOrderStatusRequest = (payload: unknown) => ({
	type: actions.setOrderStatusRequest,
	payload,
})
// Admin
export const getUsersRequest = (payload: FindAllUserResponse) => ({
	type: actions.getUsersRequest,
	payload,
})
export const setUsersPage = (payload: number) => ({
	type: actions.setUsersPage,
	payload,
})
export const updateUserRequest = (payload: AdminUser) => ({
	type: actions.updateUserRequest,
	payload,
})
// Workers
export const getWorkersRequest = (payload: FindAllUserResponse) => ({
	type: actions.getWorkersRequest,
	payload,
})
