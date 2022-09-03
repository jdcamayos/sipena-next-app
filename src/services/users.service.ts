import { FindAllUserResponse } from '../types'
import { service } from './base.service'

export class UsersService {
  async findAll() {
    const { data } = await service.get<FindAllUserResponse>('/users')
    return data
  }
}