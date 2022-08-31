import { Base } from './base'

export interface Attachment extends Base {
	uploadBy: string
	fieldname: string
	originalname: string
	encoding: string
	mimetype: string
	size: number
	destination: string
	filename: string
	path: string
	isDelete: boolean
	orderId: string
}

// Dto
export interface AddAttachmentDto {
	file: any
}

// Response
export interface AddAttachmentResponse extends Attachment {}
