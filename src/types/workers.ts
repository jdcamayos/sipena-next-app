import { Base } from './base'

export interface Worker extends Base {
	assignedBy: string
	orderId: string
	userId: string
}

// Dto
export interface AddWorkerDto extends Omit<Worker, 'id' | 'createdAt' | 'updatedAt'> {}

// Response
export interface AddWorkerResponse extends Worker {}