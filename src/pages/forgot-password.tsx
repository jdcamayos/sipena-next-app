import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// Components
import AuthLayout from '../components/auth/AuthLayout'
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'
import LoadingBackground from '../components/misc/LoadingBackground'
// Hooks
import useAuth from '../hooks/useAuth'

export default function ForgotPassword(props: NextPage) {
	const { loading, state } = useAuth()
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
			<ForgotPasswordForm />
		</AuthLayout>
	)
}
