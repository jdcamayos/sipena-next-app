import {
	CreateCustomerDto,
	CreateCustomerResponse,
	Customer,
	DeleteCustomerResponse,
	FindAllCustomerResponse,
	FindOneCustomerResponse,
	UpdateCustomerDto,
	UpdateCustomerResponse,
} from '../types'
import { service } from './base.service'

export class CustomersService {
	async findAll() {
		const { data } = await service.get<FindAllCustomerResponse>('/customers')
		return data
	}
	async findOne(customerId: Customer['id']) {
		const { data } = await service.get<FindOneCustomerResponse>(`/customers/${customerId}`)
		return data
	}
	async create(createCustomerDto: CreateCustomerDto) {
		const { data } = await service.post<CreateCustomerResponse>('/customers', createCustomerDto)
		return data
	}
	async update(customerId: Customer['id'], updateCustomerDto: UpdateCustomerDto) {
		const { data } = await service.patch<UpdateCustomerResponse>(`/customers/${customerId}`, updateCustomerDto)
		return data
	}
	async remove(customerId: Customer['id']) {
		const { data } = await service.delete<DeleteCustomerResponse>(`/customers/${customerId}`)
		return data
	}
}
