import { Base } from './base'

export interface ContainerBase {
	type: '20ft' | '40ft'
	contain: string
	productQuantity: number
	productWeight: number
	forkliftOperator: boolean
	stretchWrap: boolean
	additionalInfo: string
}

export interface Container extends Base {
	type: '20ft' | '40ft'
	contain: string
	productQuantity: number
	productWeight: number
	forkliftOperator: boolean
	stretchWrap: boolean
	additionalInfo: string
}

// Dto
export interface CreateContainerDto extends ContainerBase {}
