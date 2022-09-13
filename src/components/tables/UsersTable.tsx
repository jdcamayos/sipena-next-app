import * as React from 'react'
// MUI Styles
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
import RefreshIcon from '@mui/icons-material/Refresh'
// Components
import UserForm from '../forms/UserForm'
import TableBodyLoading from './TableBodyLoading'
// Hooks
import useUsers from '../../hooks/useUsers'

export default function UsersTable() {
	const { users, meta, loading, setPage, usersPage } = useUsers()

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage + 1)
	}

	return (
		<Paper>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography component='h2' variant='h5' color="primary">
					Users
				</Typography>
				<IconButton>
					<RefreshIcon />
				</IconButton>
			</Toolbar>
			<TableContainer component={Paper} >
				<Table size='small' aria-label='users table'>
					<TableHead sx={{ backgroundColor: 'primary.main', color: 'black' }}>
						<TableRow>
							<TableCell align='center'>Status</TableCell>
							<TableCell align='left'>Email</TableCell>
							<TableCell align='center'>Role</TableCell>
							<TableCell align='center'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableBodyLoading loading={loading} rows={10} cells={4} />
						{users.length > 0 &&
							users.map(user => (
								<TableRow key={user.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align='center'>
										{user.blocked ? (
											<Box sx={{ margin: '0 auto', width: 20, height: 20, borderRadius: 20, backgroundColor: 'red' }} />
										) : (
											<Box
												sx={{ margin: '0 auto', width: 20, height: 20, borderRadius: 20, backgroundColor: 'green' }}
											/>
										)}
									</TableCell>
									<TableCell align='left'>{user.email}</TableCell>
									<TableCell align='center'>{user.role}</TableCell>
									<TableCell align='center'>
										<UserForm initialValues={user} />
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10]}
				component='div'
				count={meta.totalItems}
				rowsPerPage={meta.itemsPerPage}
				page={usersPage - 1}
				onPageChange={handleChangePage}
			/>
		</Paper>
	)
}
