import { ChangeMyPasswordDto, FindAllUserResponse } from '../types'
import { service } from './base.service'

export class UsersService {
	async findAll() {
		const { data } = await service.get<FindAllUserResponse>('/users')
		return data
	}

	async changeMyPassword(changeMyPasswordDto: ChangeMyPasswordDto) {
		const { data } = await service.patch('/users')
    return data
	}
}
