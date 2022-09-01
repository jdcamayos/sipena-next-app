import { useRouter } from 'next/router'
import * as React from 'react'
import { getMeRequest, loginRequest, logoutRequest } from '../app/actions'
import { AppContext } from '../contexts/AppContext'
import { AuthService, CustomersService } from '../services'
import { LoginDto, RecoveryPasswordDto, RegisterDto } from '../types'

export default function useAuth() {
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string[]>([])
	const { state, dispatch } = React.useContext(AppContext)

	const router = useRouter()
	const authService = new AuthService()
	const customersService = new CustomersService()

	React.useEffect(() => {
		if (!!state.auth.isAuth) {
			const token = window.localStorage.getItem('access_token')
			if (token) {
				getMe(token)
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getMe = async (token: string) => {
		try {
			setLoading(true)
			dispatch(loginRequest(token))
			const user = await authService.me()
			dispatch(getMeRequest(user))
			// TODO: Get customer info if exists
			// if (user.role === 'customer') {
			// const customer = await customersService.findOne(user)
			// }
			router.push('/')
			setLoading(false)
		} catch (error) {
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
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const register = async (registerDto: RegisterDto) => {
		try {
			setLoading(true)
			const { access_token } = await authService.register(registerDto)
			window.localStorage.setItem('access_token', access_token)
			await getMe(access_token)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const forgotPassword = async (email: string) => {
		try {
			setLoading(true)
			const res = await authService.forgotPassword(email)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const recoveryPassword = async (recoveryPassworDto: RecoveryPasswordDto, token: string) => {
		try {
			setLoading(true)
			const { access_token } = await authService.recoveryPassword(recoveryPassworDto, token)
			await getMe(access_token)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const logout = () => {
		setLoading(true)
		window.localStorage.removeItem('access_token')
		dispatch(logoutRequest({}))
		router.push('/login')
		setLoading(false)
	}

	return { state, loading, error, login, register, forgotPassword, recoveryPassword, logout }
}
