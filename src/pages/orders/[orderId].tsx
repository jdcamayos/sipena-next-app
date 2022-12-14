import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
// MUI Styles
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// Icons
import TaskIcon from '@mui/icons-material/Task'
// Components
import CompleteOrderForm from '../../components/forms/CompleteOrderForm'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import LoadingBackground from '../../components/misc/LoadingBackground'
import OrderInfo from '../../components/misc/OrderInfo'
// Hooks
import useOrder from '../../hooks/useOrder'
import useAuth from '../../hooks/useAuth'

export default function Order(props: NextPage) {
	const { loading: authLoading, state } = useAuth()
	const router = useRouter()
	const { setOrderId, order, loading, finishOrder } = useOrder()
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

	if (authLoading) return <LoadingBackground />

	if (orderId === 'undefined') return <LoadingBackground />

	return (
		<DashboardLayout>
			<Grid
				container
				maxWidth='lg'
				component={Paper}
				sx={{
					p: 2,
					border: theme => `1px solid ${order.status ? theme.palette.error.main : theme.palette.success.main}`,
					boxShadow: theme => `0 0 0.5rem ${order.status ? theme.palette.error.main : theme.palette.success.main}`,
				}}
			>
				<Grid item xs={12} sx={{ position: 'relative' }}>
					<Typography variant='h5' fontWeight='bold' align='center' sx={{ marginBottom: 2 }}>
						Order Details
					</Typography>
					{state.user?.role !== 'customer' && !order.status && (
						<CompleteOrderForm finishOrder={finishOrder} />
					)}
				</Grid>
				{loading && (
					<Grid item xs={12} sx={{ width: '100%', display: 'grid', placeContent: 'center' }}>
						<CircularProgress />
					</Grid>
				)}
				{order.id && <OrderInfo />}
			</Grid>
		</DashboardLayout>
	)
}
