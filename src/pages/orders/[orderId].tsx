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

export default function Order(props: NextPage) {
	const router = useRouter()
	const orderId = Array.isArray(router.query.orderId) ? router.query.orderId[0] : router.query.orderId
	const { setOrderId, order, loading } = useOrder()

	React.useEffect(() => {
		if (orderId) {
			setOrderId(orderId)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderId])

	if (orderId === 'undefined') return <LoadingBackground />

	return (
		<DashboardLayout>
			<Grid container maxWidth='lg' component={Paper} sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant='h5' fontWeight='bold'>
						Order Details
					</Typography>
				</Grid>
				{loading && <CircularProgress/>}
				{order.id && <OrderInfo />}
			</Grid>
		</DashboardLayout>
	)
}
