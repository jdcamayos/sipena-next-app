import { Base, Meta } from './base'

export interface User extends Base {
	email: string
	role: 'admin' | 'customer' | 'worker'
}

export interface AdminUser extends User {
	blocked: boolean
}

// Dto
export interface UpdateAdminUserDto extends Partial<AdminUser> {}

// Responses
export interface FindAllUserResponse {
	data: AdminUser[]
	meta: Meta
}