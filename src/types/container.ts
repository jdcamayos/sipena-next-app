import { Base } from './base'

export interface ContainerBase {
	type: '20ft' | '40ft'
	contain: string
	productQuantity: number
	productWeight: number
	forkliftOperator: boolean
	stretchWrap: boolean
	additionalInfo: string
	orderId?: string
}

export interface Container extends Base {
	type: '20ft' | '40ft'
	contain: string
	productQuantity: number
	productWeight: number
	forkliftOperator: boolean
	stretchWrap: boolean
	additionalInfo: string
	orderId?: string
}

// Dto
export interface CreateContainerDto extends Omit<ContainerBase, 'id' | 'createdAt' | 'updatedAt'> {}

export interface CreateContainerItem extends CreateContainerDto {
	id: number
}
export interface UpdateContainerDto extends CreateContainerItem {}
