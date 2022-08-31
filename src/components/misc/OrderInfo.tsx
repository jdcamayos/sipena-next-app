import * as React from 'react'
// MUI Styles
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
// Others
import useOrder from '../../hooks/useOrder'
import { dateFormat } from '../../utils/dates'
import ContainersTable from '../tables/ContainersTable'
import AttachmentForm from '../forms/AttachmentForm'
import AttachmentBox from './AttachmentBox'

type Props = {
	orderId: string
}

export default function OrderInfo(props: Props) {
	const { orderId } = props
	const { order, loading } = useOrder(orderId)

	if (loading)
		return (
			<Backdrop sx={{ color: 'primary.ligth', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
		)

	if (!order) {
		return null
	}

	return (
		<Grid item xs={12} container spacing={2}>
			<Grid item xs={12}>
				<Typography>
					<strong>Date:</strong> {dateFormat(order.date)}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<ContainersTable isForm={false} containers={order.containers} />
			</Grid>
			<Grid item xs={12} container>
				<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant='h6' fontWeight='bold'>
						Attachments
					</Typography>
					<AttachmentForm />
				</Grid>
				<Grid item xs={12}>
					<AttachmentBox attachments={order.attachments} />
				</Grid>
			</Grid>
			{/* <Grid item xs={12}> */}

			{/* </Grid> */}
			<Grid item xs={12}>
				<Typography variant='h6' fontWeight='bold'>
					Workers
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button variant='contained'>Assign Worker</Button>
			</Grid>
		</Grid>
	)
}
