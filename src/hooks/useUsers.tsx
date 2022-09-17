import { AppContext } from '../contexts/AppContext'
import { AddUserImageDto, UpdateAdminUserDto } from '../types'
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

	const addUserImage = async (addUserImageDto: AddUserImageDto) => {
		try {
			setLoading(true)
			if (!state.user) {
				return
			}
			const user = await usersService.addImage(state.user.id, addUserImageDto)
			dispatch(action.getMeRequest(user))
			// dispatch(action.updateUserRequest(user))
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	const updateUser = async (userId: string, updateAdminUserDto: UpdateAdminUserDto) => {
		try {
			setLoading(true)
			const user = await usersService.update(userId, updateAdminUserDto)
			dispatch(action.updateUserRequest(user))
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const setPage = (newPage: number) => {
		dispatch(action.setUsersPage(newPage))
	}

	const refreshUsers = () => {
		fetchUsers(usersPage)
	}

	return { loading, users, meta, setPage, addUserImage, updateUser, usersPage, refreshUsers }
}
