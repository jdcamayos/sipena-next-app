import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// MUI Styles
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// Components
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import LoadingBackground from '../../components/misc/LoadingBackground'
import OrderInfo from '../../components/misc/OrderInfo'
// Hooks
import useOrder from '../../hooks/useOrder'
import useAuth from '../../hooks/useAuth'

export default function Order(props: NextPage) {
	const { loading: authLoading, state } = useAuth()
	const router = useRouter()
	const { setOrderId, order, loading } = useOrder()
	const orderId = Array.isArray(router.query.orderId) ? router.query.orderId[0] : router.query.orderId

	React.useEffect(() => {
		if (orderId) {
			setOrderId(orderId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderId])

	React.useEffect(() => {
		if (!authLoading && !window.localStorage.getItem('access_token')) {
			router.replace('/login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authLoading])

	if (authLoading) return <div>Loading...</div>

	if (orderId === 'undefined') return <LoadingBackground />

	return (
		<DashboardLayout>
			<Grid container maxWidth='lg' component={Paper} sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant='h5' fontWeight='bold'>
						Order Details
					</Typography>
				</Grid>
				{loading && <CircularProgress />}
				{order.id && <OrderInfo />}
			</Grid>
		</DashboardLayout>
	)
}
