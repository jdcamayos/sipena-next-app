import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// Components
import AuthLayout from '../components/auth/AuthLayout'
import RegisterForm from '../components/auth/RegisterForm'
// Hooks
import useAuth from '../hooks/useAuth'

export default function Register(props: NextPage) {
	const { loading, state } = useAuth()
	const { replace } = useRouter()

	React.useEffect(() => {
		if (!loading && window.localStorage.getItem('access_token')) {
			replace('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	if (loading) return <div>Loading...</div>

	return (
		<AuthLayout>
			<RegisterForm />
		</AuthLayout>
	)
}
