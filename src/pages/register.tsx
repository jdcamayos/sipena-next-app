import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// Components
import AuthLayout from '../components/auth/AuthLayout'
import LoadingBackground from '../components/misc/LoadingBackground'
import RegisterForm from '../components/auth/RegisterForm'
// Hooks
import useAuth from '../hooks/useAuth'

export default function Register(props: NextPage) {
	const { loading, register, state, error } = useAuth()
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
			<RegisterForm loading={loading} register={register} state={state} error={error} />
		</AuthLayout>
	)
}
