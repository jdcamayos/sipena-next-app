import { NextPage } from 'next'
import * as React from 'react'
// MUI Styles
import Grid from '@mui/material/Grid'
// Components
import CustomerForm from '../components/forms/CustomerForm'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import OrdersTable from '../components/tables/OrdersTable'
// Hooks
import useAuth from '../hooks/useAuth'

export default function Home(props: NextPage) {
	const { state } = useAuth()
	return (
		<DashboardLayout>
			{state.customer && <OrdersTable />}
			{state.user?.role === 'customer' && !state.customer && (
				<Grid item xs={12} sx={{ display: 'grid', placeContent: 'center', py: 2 }}>
					<CustomerForm />
				</Grid>
			)}
		</DashboardLayout>
	)
}
