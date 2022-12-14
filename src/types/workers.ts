import { Base } from './base'

export interface Worker extends Base {
	assignedBy: string
	orderId: string
	userId: string
	user: {
		email: string
	}
}

// Dto
export interface AddWorkerDto
	extends Omit<Worker, 'id' | 'createdAt' | 'updatedAt' | 'assignedBy' | 'orderId' | 'user'> {}

// Response
export interface AddWorkerResponse extends Worker {}
