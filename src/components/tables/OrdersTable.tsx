import { useRouter } from 'next/router'
import * as React from 'react'
// MUI Styles
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
// Icons
import AttachFileIcon from '@mui/icons-material/AttachFile'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
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
}

function OrderRow(props: RowProps) {
	const router = useRouter()
	const { order } = props

	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell sx={{ maxWidth: 50 }}>
				<IconButton size='small' onClick={() => router.push(`/orders/${order.id}`)}>
					<KeyboardArrowRightIcon />
				</IconButton>
			</TableCell>
			<TableCell align='center'>{order.customer.user.email}</TableCell>
			<TableCell align='center'>{dateFormat(order.date)}</TableCell>
			<TableCell align='center'>
				{order._count.containers}
			</TableCell>
			<TableCell align='center'>
				{order._count.workers}
			</TableCell>
			<TableCell align='center'>
				{order._count.attachments}
			</TableCell>
		</TableRow>
	)
}

interface Props {}

export default function OrdersTable(props: Props) {
	const { orders, meta, loading } = useOrders()
	// const [page, setPage] = React.useState(meta.page - 1)
	// const [rowsPerPage, setRowsPerPage] = React.useState(meta.itemsPerPage)

	// const handleChangePage = (event: unknown, newPage: number) => {
	// 	console.log('newPage', newPage)
	// 	// setPage(newPage)
	// }

	// const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	console.log('setRowsPerPage', +event.target.value)
	// 	console.log('setPage', 1)
	// 	// setRowsPerPage(+event.target.value)
	// 	// setPage(1)
	// }

	return (
		<Paper>
			<TableContainer component={Paper}>
				<Table aria-label='collapsible table' size='small'>
					<TableHead sx={{ backgroundColor: "primary.main", color: "black" }}>
						<TableRow>
							<TableCell />
							<TableCell align='center'>Company Name</TableCell>
							<TableCell align='center'>Date</TableCell>
							<TableCell align='center'>Containers</TableCell>
							<TableCell align='center'>Workers</TableCell>
							<TableCell align='center'>
								<AttachFileIcon />
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableBodyLoading loading={loading} rows={10} cells={6} />
						{!orders.length && !loading && (
							<TableRow>
								<TableCell colSpan={6} align='center' rowSpan={10}>
									Not containers yet
								</TableCell>
							</TableRow>
						)}
						{!!orders.length && orders.map(order => (
							<OrderRow key={order.id} order={order} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/* <TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={meta.totalItems}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/> */}
		</Paper>
	)
}
