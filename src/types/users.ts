import { Base, Meta } from './base'

export interface User extends Base {
	email: string
	role: 'admin' | 'customer' | 'worker'
}

export interface AdminUser extends User {
	blocked: boolean
}

// Dto
export interface UpdateAdminUserDto {
	role: 'admin' | 'customer' | 'worker'
	blocked: boolean
}

export interface ChangeMyPasswordDto {
	password: string
}

export interface AddUserImageDto extends FormData {}

// Responses
export interface FindAllUserResponse {
	data: AdminUser[]
	meta: Meta
}