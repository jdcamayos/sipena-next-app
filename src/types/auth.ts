import { Base } from './base'

export interface Auth {
	isAuth: boolean
	token: string
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
