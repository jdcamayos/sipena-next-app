import { AddUserImageDto, AdminUser, ChangeMyPasswordDto, FindAllUserResponse, UpdateAdminUserDto, User } from '../types'
import { service } from './base.service'

export class UsersService {
	async findAll(limit?: number, offset?: number) {
		const url = `/users?limit=${limit || 10}&offset=${offset || 0}`
		const { data } = await service.get<FindAllUserResponse>(url)
		return data
	}

	async findAllWorkers(limit?: number, offset?: number) {
		const url = `/users/workers?limit=${limit || 10}&offset=${offset || 0}`
		const { data } = await service.get<FindAllUserResponse>(url)
		return data
	}

	async addImage(userId: string, addUserImageDto: AddUserImageDto) {
		const { data } = await service.post<User>(`/users/image/${userId}`, addUserImageDto)
		return data
	}

	async update(userId: string, updateAdminUserDto: UpdateAdminUserDto) {
		const { data } = await service.patch<AdminUser>(`/users/${userId}`, updateAdminUserDto)
		return data
	}

	async changeMyPassword(changeMyPasswordDto: ChangeMyPasswordDto) {
		const { data } = await service.post<User>('/users', changeMyPasswordDto)
    return data
	}
}
