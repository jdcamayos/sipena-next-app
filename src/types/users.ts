import { Base } from './base'

export interface User extends Base {
	email: string
	role: 'admin' | 'customer' | 'worker'
}
