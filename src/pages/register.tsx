import { NextPage } from 'next'
import * as React from 'react'
// Components
import AuthLayout from '../components/auth/AuthLayout'
import RegisterForm from '../components/auth/RegisterForm'

export default function Register(props: NextPage) {
	return (
		<AuthLayout>
			<RegisterForm />
		</AuthLayout>
	)
}
