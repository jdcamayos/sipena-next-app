import { Base } from './base'

export interface CustomerBase {
	companyName: string
	streetAddress: string
	city: string
	state: string
	postalCode: string
	phone: string
	userId: string
}

export interface Customer extends Base {
	companyName: string
	streetAddress: string
	city: string
	state: string
	postalCode: string
	phone: string
	userId: string
}

// Dto
export interface CreateCustomerDto extends CustomerBase {}

export interface UpdateCustomerDto extends Partial<CustomerBase> {}

// Responses
export interface FindAllCustomerResponse {
	data: Customer[]
}

export interface FindOneCustomerResponse extends Customer {
	user: {
		id: string
		email: string
	}
}

export interface CreateCustomerResponse extends Customer {}

export interface UpdateCustomerResponse extends Customer {}

export interface DeleteCustomerResponse extends Customer {}
