import { AxiosError } from 'axios'
import * as React from 'react'
import * as action from '../app/actions'
import { AppContext } from '../contexts/AppContext'
import { AuthService, CustomersService } from '../services'
import { LoginDto, RecoveryPasswordDto, RegisterDto } from '../types'

export default function useAuth() {
	// const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string[]>([])
	const { state, dispatch } = React.useContext(AppContext)
	const { auth: {loading} } = state

	const setLoading = (status: boolean) => {
		dispatch(action.setLoading(status))
	}

	const authService = new AuthService()
	const customersService = new CustomersService()

	// Initial fetch
	React.useEffect(() => {
		const refreshSession = async () => {
			if (!state.auth.isAuth) {
				const token = window.localStorage.getItem('access_token')
				if (!!token) {
					await getMe(token)
				}
			}
		}
		refreshSession().catch(error => {
			console.log(error)
			logout()
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getMe = async (token: string) => {
		try {
			setLoading(true)
			dispatch(action.loginRequest(token))
			const user = await authService.me()
			dispatch(action.getMeRequest(user))
			if (user.role === 'customer') {
				const customer = await customersService.findMe()
				dispatch(action.getCustomerRequest(customer))
			}
			setLoading(false)
		} catch (error) {
			logout()
			setLoading(false)
			console.log(error)
		}
	}

	const login = async (loginDto: LoginDto) => {
		try {
			setLoading(true)
			const { access_token } = await authService.login(loginDto)
			window.localStorage.setItem('access_token', access_token)
			await getMe(access_token)
			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			console.log(error)
			if (error.message) {
				Array.isArray(error.message) ? setError(error.message) : setError([error.message])
			}
		}
	}

	const register = async (registerDto: RegisterDto) => {
		try {
			setLoading(true)
			const { access_token } = await authService.register(registerDto)
			window.localStorage.setItem('access_token', access_token)
			await getMe(access_token)
			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			console.log(error)
			if (error.message) {
				Array.isArray(error.message) ? setError(error.message) : setError([error.message])
			}
		}
	}

	const forgotPassword = async (email: string): Promise<void> => {
		try {
			setLoading(true)
			const res = await authService.forgotPassword(email)
			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			console.log(error)
			if (error.message) {
				Array.isArray(error.message) ? setError(error.message) : setError([error.message])
			}
		}
	}

	const recoveryPassword = async (recoveryPassworDto: RecoveryPasswordDto, token: string) => {
		try {
			setLoading(true)
			const { access_token } = await authService.recoveryPassword(recoveryPassworDto, token)
			window.localStorage.setItem('access_token', access_token)
			await getMe(access_token)
			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			console.log(error)
			if (error.message) {
				Array.isArray(error.message) ? setError(error.message) : setError([error.message])
			}
		}
	}

	const logout = () => {
		setLoading(true)
		window.localStorage.removeItem('access_token')
		dispatch(action.logoutRequest({}))
		setLoading(false)
	}

	return { state, loading, error, login, register, forgotPassword, recoveryPassword, logout }
}
