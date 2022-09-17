import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// Components
import AuthLayout from '../components/auth/AuthLayout'
import LoadingBackground from '../components/misc/LoadingBackground'
import LoginForm from '../components/auth/LoginForm'
// Hooks
import useAuth from '../hooks/useAuth'

export default function Login(props: NextPage) {
	const { loading, login, state, error } = useAuth()
	const { replace } = useRouter()

	React.useEffect(() => {
		if (!loading && window.localStorage.getItem('access_token')) {
			replace('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	if (loading) return <LoadingBackground />

	return (
		<AuthLayout>
			<LoginForm loading={loading} login={login} state={state} error={error} />
		</AuthLayout>
	)
}
