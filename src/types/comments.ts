import { Base } from './base'

export interface Comment extends Base {
	content: string
	orderId: string
	userId: string
}

// Dto
export interface AddCommentDto extends Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'orderId' | 'userId'> {}

// Response
export interface AddCommentResponse extends Comment {}
