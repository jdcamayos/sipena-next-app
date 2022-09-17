import {
	LoginDto,
	LoginResponse,
	MeResponse,
	RecoveryPasswordDto,
	RecoveryPasswordResponse,
	RegisterDto,
	RegisterResponse,
} from '../types'
import { service } from './base.service'

export class AuthService {
	async me() {
		const { data } = await service.get<MeResponse>('/auth/me')
		return data
	}

	async login(loginDto: LoginDto) {
		const { data } = await service.post<LoginResponse>('/auth/login', loginDto)
		return data
	}
	async register(registerDto: RegisterDto) {
		const { data } = await service.post<RegisterResponse>('/auth/register', registerDto)
		return data
	}
	async forgotPassword(email: string) {
		const { data } = await service.get<{ message: string }>(`/auth/forgot-password/${email}`)
		return data
	}
	async recoveryPassword(recoveryPasswordDto: RecoveryPasswordDto, token: string) {
		const { data } = await service.post<RecoveryPasswordResponse>(
			`/auth/recovery-password/${token}`,
			recoveryPasswordDto
		)
		return data
	}
}
