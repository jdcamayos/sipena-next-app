import { Auth } from './auth'
import { CreateOrderDto, FindAllOrderResponse, FindOneOrderResponse, Order } from './orders'
import { Customer } from './customers'
import { FindAllUserResponse, User } from './users'

export interface State {
	auth: Auth
	user: User | null
	customer: Customer | null
	newOrder: CreateOrderDto
	orders: FindAllOrderResponse
	actualOrderId: Order['id']
	order: FindOneOrderResponse
	users: FindAllUserResponse
	workers: FindAllUserResponse
}
