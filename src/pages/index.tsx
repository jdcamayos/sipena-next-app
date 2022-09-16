import { NextPage } from 'next'
import * as React from 'react'
// MUI Styles
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// Components
import CustomerForm from '../components/forms/CustomerForm'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import LoadingBackground from '../components/misc/LoadingBackground'
import OrdersTable from '../components/tables/OrdersTable'
// Hooks
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'

export default function Home(props: NextPage) {
	const { loading, state } = useAuth()
	const { replace } = useRouter()

	React.useEffect(() => {
		if (!loading && !window.localStorage.getItem('access_token')) {
			replace('/login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	if (loading) return <LoadingBackground />

	return (
		<DashboardLayout>
			{/* For Admins & Workers */}
			{state.user?.role !== 'customer' && <OrdersTable />}
			{/* For Customers */}
			{state.user?.role === 'customer' && state.customer && <OrdersTable />}
			{state.user?.role === 'customer' && !state.customer && (
				<>
					<Grid item xs={12} sx={{ display: 'grid', placeContent: 'center', py: 2 }}>
						<Typography>
							Welcome to Sipena Orders App, you need to create your customer profile, to create orders.
						</Typography>
					</Grid>
					<Grid item xs={12} sx={{ display: 'grid', placeContent: 'center', py: 2 }}>
						<CustomerForm />
					</Grid>
				</>
			)}
		</DashboardLayout>
	)
}
