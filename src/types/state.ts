import { Auth } from './auth'
import { Customer } from './customers'
import { CreateOrderDto, FindAllOrderResponse } from './orders'
import { User } from './users'

export interface State {
	auth: Auth
	user: User | null
	customer: Customer | null
	newOrder: CreateOrderDto
	orders: FindAllOrderResponse
	users: FindAllOrderResponse
}
