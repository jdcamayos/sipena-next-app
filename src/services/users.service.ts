import { ChangeMyPasswordDto, FindAllUserResponse } from '../types'
import { service } from './base.service'

export class UsersService {
	async findAll(limit?: number, offset?: number) {
		const url = `/users?limit=${limit || 10}&offset=${offset || 0}`
		const { data } = await service.get<FindAllUserResponse>(url)
		return data
	}

	async changeMyPassword(changeMyPasswordDto: ChangeMyPasswordDto) {
		const { data } = await service.patch('/users')
    return data
	}
}
