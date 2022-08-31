import { NextPage } from 'next'
import * as React from 'react'
// Components
import AuthLayout from '../components/auth/AuthLayout'
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'

export default function ForgotPassword(props: NextPage) {
	return (
		<AuthLayout>
			<ForgotPasswordForm />
		</AuthLayout>
	)
}
