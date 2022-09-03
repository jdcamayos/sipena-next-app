import { AppContext } from '../contexts/AppContext'
import { UsersService } from '../services'
import * as action from '../app/actions'
import * as React from 'react'
import { UpdateAdminUserDto } from '../types'

export default function useUsers() {
	const [loading, setLoading] = React.useState(false)
	const { state, dispatch } = React.useContext(AppContext)
	const { data: users, meta } = state.users

	const usersService = new UsersService()

	React.useEffect(() => {
		if (!users.length) {
			fetchUsers()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchUsers = async () => {
		try {
			setLoading(true)
			const response = await usersService.findAll()
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

	const prevPage = async () => {
		try {
			setLoading(true)
			// Service
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const nextPage = async () => {
		try {
			setLoading(true)
			// Service
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	// const example = async () => {
	//   try {
	//     setLoading(true)
	//     // Service
	//     setLoading(false)
	//   } catch (error) {
	//     setLoading(false)
	//     console.log(error)
	//   }
	// }

	return { loading, users, meta, prevPage, nextPage, updateUser }
}
