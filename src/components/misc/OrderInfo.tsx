import * as React from 'react'
// MUI Styles
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// Hooks
import useOrder from '../../hooks/useOrder'
// Components
import AttachmentBox from './AttachmentBox'
import AttachmentForm from '../forms/AttachmentForm'
import CommentBox from './CommentBox'
import CommentForm from '../forms/CommentForm'
import ContainersTable from '../tables/ContainersTable'
import WorkerBox from './WorkerBox'
import WorkerForm from '../forms/WorkerForm'
// Utils
import { dateFormat } from '../../utils/dates'
import useAuth from '../../hooks/useAuth'

interface Props {}

export default function OrderInfo(props: Props) {
	const { order, loading } = useOrder()
	const { state } = useAuth()

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
			<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography>
					<strong>Date: </strong> {dateFormat(order.date)}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<Typography>
						<strong>Status: </strong>{' '}
					</Typography>
					<Paper
						sx={{
							fontSize: 14,
							paddingX: 1.25,
							paddingY: 0.25,
							backgroundColor: theme => (order.status ? theme.palette.error.main : theme.palette.success.main),
							textAlign: 'center',
							color: theme => (theme.palette.mode === 'dark' ? 'black' : 'white'),
						}}
					>
						{order.status ? 'completed' : 'active'}
					</Paper>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<ContainersTable isForm={false} containers={order.containers} />
			</Grid>
			<Grid item xs={12} container>
				<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant='h6' fontWeight='bold'>
						Attachments
					</Typography>
					{state.user?.role === 'admin' && !order.status && <AttachmentForm />}
					{state.user?.role === 'worker' && !order.status && <AttachmentForm />}
				</Grid>
				<Grid item xs={12}>
					<AttachmentBox attachments={order.attachments} />
				</Grid>
			</Grid>
			<Grid item xs={12} container>
				<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant='h6' fontWeight='bold'>
						Workers
					</Typography>
					{state.user?.role === 'admin' && !order.status && <WorkerForm />}
				</Grid>
				<Grid item xs={12}>
					<WorkerBox workers={order.workers} isCustomer={state.user?.role === 'customer'} />
				</Grid>
			</Grid>
			<Grid item xs={12} container>
				<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant='h6' fontWeight='bold'>
						Comments
					</Typography>
					{!order.status && <CommentForm />}
				</Grid>
				<Grid item xs={12}>
					<CommentBox comments={order.comments} isCustomer={state.user?.role === 'customer'} />
				</Grid>
			</Grid>
		</Grid>
	)
}
