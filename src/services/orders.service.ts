import {
	AddAttachmentDto,
	AddAttachmentResponse,
	AddCommentDto,
	AddCommentResponse,
	AddWorkerDto,
	CreateOrderDto,
	CreateOrderRequestDto,
	CreateOrderResponse,
	FindAllOrderResponse,
	FindOneOrderResponse,
	Order,
} from '../types'
import { service } from './base.service'

export class OrdersService {
	async findAll(limit?: number, offset?: number) {
		const url = `/orders?limit=${limit || 10}&offset=${offset || 0}`
		const { data } = await service.get<FindAllOrderResponse>(url)
		return data
	}
	async findAllByCustomer(limit?: number, offset?: number) {
		const url = `/orders/customer?limit=${limit || 10}&offset=${offset || 0}`
		const { data } = await service.get<FindAllOrderResponse>(url)
		return data
	}
	async findAllByWorker(limit?: number, offset?: number) {
		const url = `/orders/workers?limit=${limit || 10}&offset=${offset || 0}`
		const { data } = await service.get<FindAllOrderResponse>(url)
		return data
	}
	async findOne(orderId: Order['id']) {
		const { data } = await service.get<FindOneOrderResponse>(`/orders/${orderId}`)
		return data
	}
	async create(createOrderDto: CreateOrderRequestDto) {
		const { data } = await service.post<CreateOrderResponse>(`/orders`, createOrderDto)
		return data
	}
	// After Create Order
	async addAttachmentToOrder(orderId: Order['id'], addAttachmentDto: AddAttachmentDto) {
		const { data } = await service.post<AddAttachmentResponse>(`/orders/${orderId}/attachments`, addAttachmentDto)
		return data
	}
	async addCommentToOrder(orderId: Order['id'], addCommentDto: AddCommentDto) {
		const { data } = await service.post<AddCommentResponse>(`/orders/${orderId}/comments`, addCommentDto)
		return data
	}
	async addWorkerToOrder(orderId: Order['id'], addWorkerDto: AddWorkerDto) {
		const { data } = await service.post<AddWorkerDto>(`/orders/${orderId}/workers`, addWorkerDto)
		return data
	}
}
