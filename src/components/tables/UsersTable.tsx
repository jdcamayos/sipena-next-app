import * as React from 'react'
// MUI Styles
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
// Others
import UserForm from '../forms/UserForm'
import useAdmin from '../../hooks/useAdmin'
import TableBodyLoading from './TableBodyLoading'

export default function UsersTable() {
	const { users, loading } = useAdmin()

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<Typography variant='h5' sx={{ mb: 2 }}>
				Users
			</Typography>
			<TableContainer component={Paper} sx={{ maxWidth: 650 }}>
				<Table size='small' aria-label='users table'>
					<TableHead sx={{ backgroundColor: "primary.main", color: "black" }}>
						<TableRow>
							<TableCell align='center'>Status</TableCell>
							<TableCell align='left'>Email</TableCell>
							<TableCell align='center'>Role</TableCell>
							<TableCell align='center'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableBodyLoading loading={loading} rows={10} cells={4} />
						{users.map(user => (
							<TableRow key={user.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell align='center'>
									{user.blocked ? (
										<Box sx={{ margin: '0 auto', width: 20, height: 20, borderRadius: 20, backgroundColor: 'red' }} />
									) : (
										<Box sx={{ margin: '0 auto', width: 20, height: 20, borderRadius: 20, backgroundColor: 'green' }} />
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
		</Box>
	)
}
