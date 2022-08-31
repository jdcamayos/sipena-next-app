import { NextPage } from 'next'
import * as React from 'react'
// Components
import AuthLayout from '../components/auth/AuthLayout'
import RecoveryPasswordForm from '../components/auth/RecoveryPasswordForm'

export default function RecoveryPassword(props: NextPage) {
	return (
		<AuthLayout>
			<RecoveryPasswordForm />
		</AuthLayout>
	)
}
