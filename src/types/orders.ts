import { Attachment } from './attachments'
import { Base } from './base'
import { Container, CreateContainerDto } from './container'

export interface OrderBase {
	date: Date
	customerId: string
	containers: CreateContainerDto[]
}

export interface Order extends Base {
	date: Date
	status: boolean
	customerId: string
}

export interface OrderItem extends Order {
	customer: {
		user: {
			email: string
		}
	}
	_count: {
		attachments: number
		comments: number
		containers: number
		workers: number
	}
}

// Dto
export interface CreateOrderDto extends OrderBase {}

// Responses
export interface FindAllOrderResponse {
	data: OrderItem[]
}

export interface FindOneOrderResponse extends Order {
	attachments: Attachment[]
	comments: Comment[]
	containers: Container[]
	workers: Object
}

export interface CreateOrderResponse extends Order {
	containers: Container[]
}
