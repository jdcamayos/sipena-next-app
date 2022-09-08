import * as React from 'react'
// MUI Styles
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
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
					{state.user?.role === 'admin' && <AttachmentForm />}
					{state.user?.role === 'worker' && <AttachmentForm />}
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
					{state.user?.role === 'admin' && <WorkerForm />}
				</Grid>
				<Grid item xs={12}>
					<WorkerBox workers={order.workers} />
				</Grid>
			</Grid>
			<Grid item xs={12} container>
				<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant='h6' fontWeight='bold'>
						Comments
					</Typography>
					<CommentForm />
				</Grid>
				<Grid item xs={12}>
					<CommentBox comments={order.comments} />
				</Grid>
			</Grid>
		</Grid>
	)
}
