import * as React from 'react'
import { AppContext } from '../contexts/AppContext'
import { AuthService } from '../services'
import { LoginDto, RecoveryPasswordDto, RegisterDto } from '../types'

export default function useAuth() {
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<string[]>([])
	const { state, dispatch } = React.useContext(AppContext)

	const authService = new AuthService()

	React.useEffect(() => {})

	const login = async (loginDto: LoginDto) => {}

	const register = async (registerDto: RegisterDto) => {}

	const forgotPassword = async (email: string) => {}

	const recoveryPassword = async (recoveryPassworDto: RecoveryPasswordDto, token: string) => {}

	const logout = () => {}

	return { state, loading, error, login, register, forgotPassword, recoveryPassword, logout }
}
