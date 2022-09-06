import { AppContext } from '../contexts/AppContext'
import { UpdateAdminUserDto } from '../types'
import { UsersService } from '../services'
import * as action from '../app/actions'
import * as React from 'react'

export default function useUsers() {
	const [loading, setLoading] = React.useState(false)
	const { state, dispatch } = React.useContext(AppContext)
	const { data: users, meta } = state.users
	const { usersPage } = state

	const usersService = new UsersService()

	React.useEffect(() => {
		if (!users.length) {
			fetchUsers(usersPage)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		fetchUsers(usersPage)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usersPage])

	const fetchUsers = async (usersPage: number) => {
		try {
			setLoading(true)
			const offset = meta.itemsPerPage * (usersPage - 1)
			const limit = 10
			const response = await usersService.findAll(limit, offset)
			dispatch(action.getUsersRequest(response))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const updateUser = async (updateAdminUserDto: UpdateAdminUserDto) => {
		try {
			setLoading(true)
			// Service
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const setPage = (newPage: number) => {
		dispatch(action.setUsersPage(newPage))
	}

	return { loading, users, meta, setPage, updateUser, usersPage }
}
