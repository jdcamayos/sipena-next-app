import { NextPage } from 'next'
import * as React from 'react'
// Components
import AuthLayout from '../components/auth/AuthLayout'
import LoginForm from '../components/auth/LoginForm'

export default function Login(props: NextPage) {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	)
}
