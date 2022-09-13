import { useRouter } from 'next/router'
import * as React from 'react'
// MUI Styles
import { SvgIconProps } from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
// Icons
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CommentIcon from '@mui/icons-material/Comment'
import DoorSlidingIcon from '@mui/icons-material/DoorSliding'
import GroupIcon from '@mui/icons-material/Group'
import RefreshIcon from '@mui/icons-material/Refresh'
// Components
import TableBodyLoading from './TableBodyLoading'
// Hooks
import useOrders from '../../hooks/useOrders'
// Utils
import { dateFormat } from '../../utils/dates'
// Types
import { OrderItem } from '../../types'

interface RowProps {
	order: OrderItem
	role: 'admin' | 'customer' | 'worker'
}

function OrderRow(props: RowProps) {
	const router = useRouter()
	const { order, role } = props

	return (
		<TableRow
			hover
			onClick={() => router.push(`/orders/${order.id}`)}
			sx={{ '&:hover': { cursor: 'pointer' }, '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell align='center'>
				{order.status ? (
					<Box sx={{ margin: '0 auto', width: 20, height: 20, borderRadius: 20, backgroundColor: 'red' }} />
				) : (
					<Box sx={{ margin: '0 auto', width: 20, height: 20, borderRadius: 20, backgroundColor: 'green' }} />
				)}
			</TableCell>
			{role !== 'customer' && <TableCell align='center'>{order.customer.companyName}</TableCell>}
			<TableCell align='center'>{dateFormat(order.createdAt)}</TableCell>
			<TableCell align='center'>{dateFormat(order.date)}</TableCell>
			<TableCell align='center'>{order._count.containers}</TableCell>
			<TableCell align='center'>{order._count.comments}</TableCell>
			<TableCell align='center'>{order._count.workers}</TableCell>
			<TableCell align='center'>{order._count.attachments}</TableCell>
		</TableRow>
	)
}

interface IconTableCellProps {
	label: string
	icon: React.ReactElement<SvgIconProps>
}

function IconTableCell(props: IconTableCellProps) {
	const { label, icon } = props
	return (
		<TableCell align='center'>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				{React.cloneElement(icon, { sx: { display: { xs: 'block', md: 'none', lg: 'block' } } })}
				<Typography sx={{ display: { xs: 'none', md: 'block' }, paddingLeft: { lg: 1 } }}>{label}</Typography>
			</Box>
		</TableCell>
	)
}

interface Props {}

export default function OrdersTable(props: Props) {
	const { orders, meta, loading, setPage, ordersPage, state, refreshOrders } = useOrders()

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage + 1)
	}

	return (
		<Paper>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography component='h2' variant='h5' color="primary">
					Orders
				</Typography>
				<IconButton onClick={() => refreshOrders()}>
					<RefreshIcon />
				</IconButton>
			</Toolbar>
			<TableContainer component={Paper}>
				<Table aria-label='collapsible table' size='small'>
					<TableHead sx={{ backgroundColor: 'primary.main', color: 'black' }}>
						<TableRow>
							<TableCell align='center'>Status</TableCell>
							{state.user?.role !== 'customer' && <TableCell align='center'>Company Name</TableCell>}
							<TableCell align='center'>Created Date</TableCell>
							<TableCell align='center'>Date</TableCell>
							<IconTableCell label='Containers' icon={<DoorSlidingIcon />} />
							<IconTableCell label='Comments' icon={<CommentIcon />} />
							<IconTableCell label='Workers' icon={<GroupIcon />} />
							<IconTableCell label='Attachments' icon={<AttachFileIcon />} />
						</TableRow>
					</TableHead>
					<TableBody>
						<TableBodyLoading loading={loading} rows={10} cells={8} />
						{!orders.length && !loading && (
							<TableRow>
								<TableCell colSpan={8} align='center' rowSpan={10}>
									Not containers yet
								</TableCell>
							</TableRow>
						)}
						{!!orders.length &&
							!loading &&
							orders.map(order => <OrderRow key={order.id} order={order} role={state.user?.role || 'customer'} />)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10]}
				component='div'
				count={meta.totalItems}
				rowsPerPage={meta.itemsPerPage}
				page={ordersPage - 1}
				onPageChange={handleChangePage}
			/>
		</Paper>
	)
}
