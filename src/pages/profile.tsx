import { NextPage } from 'next'
import * as React from 'react'
// MUI Styles
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
// Components
import CustomerForm from '../components/forms/CustomerForm'
import CustomerInfo from '../components/forms/CustomerInfo'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import UserInfo from '../components/misc/UserInfo'
// Hooks
import useAuth from '../hooks/useAuth'

export default function Profile(props: NextPage) {
  const { state } = useAuth()
  const { auth, user, customer } = state

  const customerSection = () => {
		if (customer === null)
			return (
				<Grid item xs={12} sx={{ display: 'grid', placeContent: 'center', py: 2  }}>
					<CustomerForm />
				</Grid>
			)

		return <CustomerInfo initialValues={customer} />
	}

  return (
    <DashboardLayout>
      <Paper sx={{ p: 3 }}>
				<Grid container maxWidth='lg'>
					<Grid item xs={12} md={6} sx={{ display: 'grid', placeContent: 'center' }}>
						<Avatar
							alt='Remy Sharp'
							sx={{
								width: { xs: 120, md: 200 },
								height: { xs: 120, md: 200 },
							}}
						/>
					</Grid>
					{user && <UserInfo user={user} />}
					{user?.role === 'customer' && customerSection()}
				</Grid>
			</Paper>
    </DashboardLayout>
  )
}
