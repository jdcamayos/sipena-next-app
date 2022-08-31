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
// import Skeleton from '@mui/material/Skeleton'
// import Box from '@mui/material/Box'
// import Collapse from '@mui/material/Collapse'
// import Typography from '@mui/material/Typography'
// Icons
import AttachFileIcon from '@mui/icons-material/AttachFile'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
// Others
import { dateFormat } from '../../utils/dates'
import { OrderResponseArray } from '../../types'
import { useNavigate } from 'react-router-dom'
import useOrders from '../../hooks/useOrders'
import TableBodyLoading from './TableBodyLoading'
// import SearchInput from '../dashboard/SearchInput'



// function CollapsibleMiniTable() {
// 	return (
// 		<Table size='small' aria-label='purchases'>
// 			<TableHead>
// 				<TableRow>
// 					<TableCell>Assigned Date</TableCell>
// 					<TableCell>Name</TableCell>
// 					<TableCell align='right'>Email</TableCell>
// 					<TableCell align='right'>Assigned By</TableCell>
// 				</TableRow>
// 			</TableHead>
// 			<TableBody>
// 				{/* {row.history.map(historyRow => (
// 										<TableRow key={historyRow.date}>
// 											<TableCell component='th' scope='row'>
// 												{historyRow.date}
// 											</TableCell>
// 											<TableCell>{historyRow.customerId}</TableCell>
// 											<TableCell align='right'>{historyRow.amount}</TableCell>
// 											<TableCell align='right'>{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>
// 										</TableRow>
// 									))} */}
// 			</TableBody>
// 		</Table>
// 	)
// }

// type PropsCollapsibleSection = {
// 	open: boolean
// 	title: string
// 	headers: string[]
// 	data: any
// }

// function CollapsibleSection({ open = false, title, headers, data }: PropsCollapsibleSection) {
// 	return (
// 		<TableRow>
// 			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
// 				<Collapse in={open} timeout='auto' unmountOnExit>
// 					<Box sx={{ margin: 1 }}>
// 						<Typography variant='h6' gutterBottom component='div'>
// 							Containers
// 						</Typography>
// 						<CollapsibleMiniTable />
// 					</Box>
// 				</Collapse>
// 			</TableCell>
// 		</TableRow>
// 	)
// }

type RowProps = {
	order: OrderResponseArray
}

function OrderRow({ order }: RowProps) {
	console.log(order)
	const navigate = useNavigate()
	// const [open, setOpen] = React.useState<{ attachment: boolean; container: boolean; worker: boolean }>({
	// 	attachment: false,
	// 	container: false,
	// 	worker: false,
	// })

	// const handleOpen = (section: 'attachment' | 'container' | 'worker') => {
	// 	if (open[section]) {
	// 		setOpen(prev => ({
	// 			...prev,
	// 			[section]: false,
	// 		}))
	// 	} else {
	// 		setOpen(prev => ({
	// 			...prev,
	// 			[section]: true,
	// 		}))
	// 	}
	// }

	return (
		<>
			<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				<TableCell sx={{ maxWidth: 50 }}>
					<IconButton size='small' onClick={() => navigate(`/order/${order.id}`)}>
						<KeyboardArrowRightIcon />
					</IconButton>
				</TableCell>
				<TableCell align='center'>{order.customer.companyName}</TableCell>
				<TableCell align='center'>{dateFormat(order.date)}</TableCell>
				<TableCell align='center'>
					{order._count.containers}
					{/* <IconButton aria-label='expand row' size='small' onClick={() => handleOpen('container')}>
						{open.container ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton> */}
				</TableCell>
				<TableCell align='center'>
					{order._count.workers}
					{/* <IconButton aria-label='expand row' size='small' onClick={() => handleOpen('worker')}>
						{open.worker ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton> */}
				</TableCell>
				<TableCell align='center'>
					{order._count.attachments}
					{/* <IconButton aria-label='expand row' size='small' onClick={() => handleOpen('container')}>
						{open.attachment ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton> */}
				</TableCell>
			</TableRow>
			{/* <CollapsibleSection open={} /> */}
		</>
	)
}

// type SkillRowProps = {
// 	cells?: number
// }

// function SkillRow(props: SkillRowProps) {
// 	const { cells } = props

// 	return (
// 		<TableRow>
// 			{Array.from({ length: cells ? cells : 1 }).map((_,i) => (
// 				<TableCell key={`cell-${i}`}>
// 					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
// 				</TableCell>
// 			))}
// 		</TableRow>
// 	)
// }


type Props = {
	// orders: OrderResponseArray[]
}

export default function OrdersTable(props: Props) {
	const { orders, loading } = useOrders()
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value)
		setPage(1)
	}
	return (
		<Paper>
			{/* <Box sx={{ display: "flex", py: 2, alignItems: "center", flexDirection: { xs: "column", md: "row" } }}>
				<SearchInput />
			</Box> */}
			<TableContainer component={Paper}>
				<Table aria-label='collapsible table' size='small'>
					{/* <TableHead>
						<TableRow></TableRow>
					</TableHead> */}
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
						{/* {loading && Array.from({ length: 10 }).map((_,i) => (
							<SkillRow key={i} cells={6}/>
						))} */}
						{!orders.length && (
							<TableRow>
								<TableCell colSpan={6} align='center'>
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
			<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					// sx={{ flexGrow: 1 }}
					count={orders.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
		</Paper>
	)
}
