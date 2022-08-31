import { Base } from './base'
import { Customer } from './customers'
import { User } from './users'

export interface Auth {
	auth: {
		isAuth: boolean
		token: string
	}
	user: User | null
	customer: Customer | null
}

// Dto
export interface RegisterDto {
	email: string
	password: string
}

export interface LoginDto {
	email: string
	password: string
}

export interface RecoveryPasswordDto {
	password: string
}

// Responses
export interface MeResponse extends Base {
	email: string
	role: 'admin' | 'customer' | 'worker'
}

export interface LoginResponse {
	access_token: string
}

export interface RegisterResponse {
	access_token: string
}

export interface RecoveryPasswordResponse {
	access_token: string
}
