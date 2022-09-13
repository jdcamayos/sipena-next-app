import { NextPage } from 'next'
import * as React from 'react'
// MUI Styles
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
// Components
import CustomerForm from '../components/forms/CustomerForm'
import CustomerInfo from '../components/forms/CustomerInfo'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import UserInfo from '../components/misc/UserInfo'
// Hooks
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import BigAvatar from '../components/forms/BigAvatar'

export default function Profile(props: NextPage) {
	const { loading, state } = useAuth()
	const { replace } = useRouter()

	const { user, customer } = state

	const customerSection = () => {
		if (customer === null)
			return (
				<Grid item xs={12} sx={{ display: 'grid', placeContent: 'center', py: 2 }}>
					<CustomerForm />
				</Grid>
			)

		return <CustomerInfo />
	}

	React.useEffect(() => {
		if (!loading && !window.localStorage.getItem('access_token')) {
			replace('/login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, state.auth.isAuth])

	if (loading) return <div>Loading...</div>

	return (
		<DashboardLayout>
			<Paper sx={{ p: 3 }}>
				<Grid container maxWidth='lg'>
					{user && <BigAvatar email={user.email} role={user.role} image={user.image} />}
					{user && <UserInfo user={user} />}
					{user?.role === 'customer' && customerSection()}
				</Grid>
			</Paper>
		</DashboardLayout>
	)
}
