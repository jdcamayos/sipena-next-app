import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// Components
import AuthLayout from '../../components/auth/AuthLayout'
import LoadingBackground from '../../components/misc/LoadingBackground'
import RecoveryPasswordForm from '../../components/auth/RecoveryPasswordForm'
// Hooks
import useAuth from '../../hooks/useAuth'

export default function RecoveryPassword(props: NextPage) {
	const { loading, state, recoveryPassword } = useAuth()
	const { replace, query } = useRouter()

	const recoveryToken = Array.isArray(query.recoveryToken) ? query.recoveryToken[0] : query.recoveryToken

	React.useEffect(() => {
		if (!loading && window.localStorage.getItem('access_token')) {
			replace('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	if (loading) return <LoadingBackground />

	return (
		<AuthLayout>
			{!!recoveryToken && (
				<RecoveryPasswordForm loading={loading} recoveryPassword={recoveryPassword} recoveryToken={recoveryToken} />
			)}
		</AuthLayout>
	)
}
