import { Attachment } from './attachments'
import { Base, Meta } from './base'
import { Container, CreateContainerDto, CreateContainerItem } from './container'
import { Comment } from './comments'
import { Worker } from './workers'

export interface Order extends Base {
	date: Date
	status: boolean
	customerId: string
}

export interface OrderItem extends Order {
	customer: {
		companyName: string,
		user: {
			email: string
			role: 'admin' | 'customer' | 'worker'
			image: string
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
export interface CreateOrderDto extends Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'> {
	containers: CreateContainerItem[]
}

export interface CreateOrderRequestDto extends Omit<CreateOrderDto, 'containers'> {
	containers: CreateContainerDto[]
}

// Responses
export interface FindAllOrderResponse {
	data: OrderItem[]
	meta: Meta
}

export interface FindOneOrderResponse extends Order {
	attachments: Attachment[]
	comments: Comment[]
	containers: Container[]
	workers: Worker[]
}

export interface CreateOrderResponse extends Order {
	containers: Container[]
}
